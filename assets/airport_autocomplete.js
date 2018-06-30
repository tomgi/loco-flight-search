import $ from 'jquery';
import Bloodhound from 'bloodhound-js';
import 'typeahead.js';

import suggestionTemplate from './templates/airport_autocomplete/suggestion.hbs';
import emptyTemplate from './templates/airport_autocomplete/empty.hbs';
import pendingTemplate from './templates/airport_autocomplete/pending.hbs';

const airportsSource = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.whitespace,
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  remote: {
    url: '/airports/%QUERY',
    wildcard: '%QUERY',
  },
});

class AirportAutocomplete {
  constructor(airportInputField) {
    if ($(airportInputField).length !== 1) {
      throw new Error('AirportAutocomplete component must be given a single DOM element to attach to.');
    }

    $(airportInputField).typeahead({
      minLength: 3,
      highlight: true,
    }, {
      name: 'airports',
      display: 'airportName',
      source: airportsSource,
      templates: {
        pending: pendingTemplate,
        empty: emptyTemplate,
        suggestion: suggestionTemplate,
      },
    });

    $(airportInputField).bind('typeahead:select', (_ev, suggestion) => {
      this.value = suggestion;
    });
  }
}

export { AirportAutocomplete as default };
