<template>
  <div>
    <div>
      <AirportAutocomplete
        label="From"
        placeholder="Where are you flying from?"
        @select="from = $event"/>

      <AirportAutocomplete
        label="To"
        placeholder="Where are you flying to?"
        @select="to = $event"/>

      <Datepicker @select="date = $event"/>

      <div class="field">
        <div class="control">
          <button
            ref="submitButton"
            name="submit"
            class="button is-link"
            @click="searchAndRenderFlights">Submit</button>
        </div>
      </div>
    </div>

    <FlightSearchResults :flights="flights"/>
  </div>
</template>

<script>
import $ from 'jquery';
import moment from 'moment';

import Datepicker from './Datepicker.vue';
import AirportAutocomplete from './AirportAutocomplete.vue';
import FlightSearchResults from './FlightSearchResults.vue';

export default {
  components: {
    AirportAutocomplete,
    Datepicker,
    FlightSearchResults,
  },

  data() {
    return {
      date: null,
      from: null,
      to: null,
      flights: { data: [] },
    };
  },

  methods: {
    searchAndRenderFlights() {
      const submitButton = $(this.$refs.submitButton);

      const validation = this.validateInput();
      if (validation.error) {
        this.flights = { state: 'failed', error: validation.error };
        return;
      }

      submitButton.prop('disabled', true);
      this.flights = { state: 'pending' };

      const fromCode = this.from.airportCode;
      const toCode = this.to.airportCode;
      const formattedDate = this.date.format('YYYY-MM-DD');
      $.get(`/search/${fromCode}/${toCode}/${formattedDate}`)
        .done((flights) => {
          const cheapestFirst = flights.sort((a, b) => a.price - b.price);
          this.flights = { state: 'completed', data: cheapestFirst };
        })
        .fail(() => { this.flights = { state: 'failed', error: 'Something went wrong. Try again or contact support.' }; })
        .always(() => submitButton.prop('disabled', false));
    },

    validateInput() {
      if (!(this.from && this.to && this.date)) {
        return { error: 'Please fill all the fields above' };
      }
      // TODO: This validation should work against current date in the departure airport's timezone
      // Otherwise it's actually possible to search for past flights, which results in backend error
      // e.x. A user located in Europe searching for flights in Australia for today's date
      // In Australia it may already be the next day, but the current validation won't catch it
      if (this.date.isBefore(moment().startOf('day'))) {
        return { error: 'Selected date is in the past' };
      }
      return {};
    },
  },
};
</script>

