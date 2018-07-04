import PropTypes from 'prop-types';
import React from 'react';
import $ from 'jquery';
import Bloodhound from 'bloodhound-js';
import 'typeahead.js';

const airportsSource = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.whitespace,
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  remote: {
    url: '/airports/%QUERY',
    wildcard: '%QUERY',
  },
});

export default class AirportAutocomplete extends React.Component {
  constructor(props) {
    super(props);

    this.initAutocomplete = (field) => {
      $(field).typeahead({
        minLength: 3,
        highlight: true,
      }, {
        name: 'airports',
        display: 'airportName',
        source: airportsSource,
        templates: {
          pending: '<span class="tt-suggestion fas fa-spinner fa-spin fa-3x"></span>',
          empty: '<div class="empty-message">Unable to find any airports that match the current query</div>',
          suggestion: data => `<div><strong>${data.airportCode}</strong> – ${data.airportName} (${data.cityName}, ${data.countryName})</div>`,
        },
      });

      $(field).bind('typeahead:select', (_ev, suggestion) => {
        const { onSelect } = this.props;
        onSelect(suggestion);
      });
    };
  }

  render() {
    const { label, placeholder } = this.props;
    return (
      <div className="field">
        <div className="label">
          { label }
        </div>
        <div className="control">
          <input
            placeholder={placeholder}
            className="input"
            type="text"
            ref={this.initAutocomplete}
          />
        </div>
      </div>
    );
  }
}

AirportAutocomplete.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};
