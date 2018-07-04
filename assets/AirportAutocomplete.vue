<template>
  <div class="field">
    <label class="label">{{ label }}</label>
    <div class="control">
      <input
        ref="input"
        :placeholder="placeholder"
        class="input"
        type="text">
    </div>
  </div>
</template>

<script>
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

export default {
  props: {
    placeholder: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  data() {
    return { value: null };
  },
  mounted() {
    const input = $(this.$refs.input);
    input.typeahead({
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

    input.bind('typeahead:select', (_ev, suggestion) => {
      this.value = suggestion;
      this.$emit('select', this.value);
    });
  },
};
</script>

