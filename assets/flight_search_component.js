import $ from 'jquery';
import moment from 'moment';
import Handlebars from 'handlebars/runtime';
import HandlebarsIntl from 'handlebars-intl';
import AirportAutocomplete from './airport_autocomplete';
import Datepicker from './datepicker';

import mainComponentTemplate from './templates/flight_search_component/main.hbs';
import missingFieldsTemplate from './templates/flight_search_component/missing_fields.hbs';
import dateInThePastTemplate from './templates/flight_search_component/date_in_the_past.hbs';
import serverErrorTemplate from './templates/flight_search_component/server_error.hbs';
import spinnerTemplate from './templates/flight_search_component/spinner.hbs';
import searchResultTemplate from './templates/flight_search_component/search_results.hbs';

HandlebarsIntl.registerWith(Handlebars);

class FlightSearchComponent {
  constructor(componentRootNode) {
    this.componentRootNode = $(componentRootNode);
    this.componentRootNode.html(mainComponentTemplate());

    this.airportFrom = new AirportAutocomplete(this.componentRootNode.find('input[name=airport-from]'));
    this.airportTo = new AirportAutocomplete(this.componentRootNode.find('input[name=airport-to]'));
    this.date = new Datepicker(this.componentRootNode.find('input[name=date]'));

    this.submitButton = this.componentRootNode.find('button[name=submit]');
    this.submitButton.click(event => this.searchAndRenderFlights(event));
  }

  searchAndRenderFlights() {
    const resultsHtmlElement = this.componentRootNode.find('.js-results');

    const validation = this.validateInput();
    if (validation.error) {
      resultsHtmlElement.html(validation.error);
      return;
    }

    this.submitButton.prop('disabled', true);
    resultsHtmlElement.html(spinnerTemplate());

    const fromCode = this.airportFrom.value.airportCode;
    const toCode = this.airportTo.value.airportCode;
    const formattedDate = this.date.value.format('YYYY-MM-DD');
    $.get(`/search/${fromCode}/${toCode}/${formattedDate}`)
      .done((flights) => {
        const cheapestFirst = flights.sort((a, b) => a.price - b.price);
        resultsHtmlElement.html(searchResultTemplate(cheapestFirst));
      })
      .fail(() => resultsHtmlElement.html(serverErrorTemplate()))
      .always(() => this.submitButton.prop('disabled', false));
  }

  validateInput() {
    if (!(this.airportFrom.value && this.airportTo.value && this.date.value)) {
      return { error: missingFieldsTemplate() };
    }
    // TODO: This validation should work against current date in the departure airport's timezone
    // Otherwise it's actually possible to search for past flights, which results in backend error
    // e.x. A user located in Europe searching for flights in Australia for today's date
    // In Australia it may already be the next day, but the current validation won't catch it
    if (this.date.value.isBefore(moment().startOf('day'))) {
      return { error: dateInThePastTemplate() };
    }
    return {};
  }
}

export { FlightSearchComponent as default };
