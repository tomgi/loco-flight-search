import PropTypes from 'prop-types';
import React from 'react';
import $ from 'jquery';
import moment from 'moment';

import Datepicker from './Datepicker';
import AirportAutocomplete from './AirportAutocomplete';
import FlightSearchResults from './FlightSearchResults';

export default class FlightSearchComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = { flights: {} };

    this.submitButton = React.createRef();

    this.searchAndRenderFlights = () => {
      const validation = this.validateInput();
      if (validation.error) {
        this.setState({ flights: { state: 'failed', error: validation.error } });
        return;
      }

      // $(this.submitButton).prop('disabled', true);
      this.setState({ flights: { state: 'pending' } });

      const { from, to, date } = this.state;
      const fromCode = from.airportCode;
      const toCode = to.airportCode;
      const formattedDate = date.format('YYYY-MM-DD');
      $.get(`/search/${fromCode}/${toCode}/${formattedDate}`)
        .done((flights) => {
          const cheapestFirst = flights.sort((a, b) => a.price - b.price);
          this.setState({ flights: { state: 'completed', data: cheapestFirst } });
        })
        .fail(() => { this.setState({ flights: { state: 'failed', error: 'Something went wrong. Try again or contact support.' } }); });
      // .always(() => $(this.submitButton).prop('disabled', false));
    };

    this.validateInput = () => {
      const { from, to, date } = this.state;
      if (!(from && to && date)) {
        return { error: 'Please fill all the fields above' };
      }
      // TODO: This validation should work against current date in the departure airport's timezone
      // Otherwise it's actually possible to search for past flights, which results in backend error
      // e.x. A user located in Europe searching for flights in Australia for today's date
      // In Australia it may already be the next day, but the current validation won't catch it
      if (date.isBefore(moment().startOf('day'))) {
        return { error: 'Selected date is in the past' };
      }
      return {};
    };
  }

  render() {
    const { id } = this.props;
    const { flights } = this.state;
    return (
      <div id={id}>
        <div>
          <AirportAutocomplete
            label="From"
            placeholder="Where are you flying from?"
            onSelect={value => this.setState({ from: value })}
          />

          <AirportAutocomplete
            label="To"
            placeholder="Where are you flying to?"
            onSelect={value => this.setState({ to: value })}
          />

          <Datepicker onSelect={value => this.setState({ date: value })} />

          <div className="field">
            <div className="control">
              <button
                type="submit"
                name="submit"
                className="button is-link"
                onClick={this.searchAndRenderFlights}
                ref={this.submitButton}
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        <FlightSearchResults flights={flights} />
      </div>
    );
  }
}

FlightSearchComponent.propTypes = {
  id: PropTypes.string.isRequired,
};
