<template>
  <div id="app">
    <section class="section">
      <div class="container">
        <h1 class="title">
          Loco Flight Finder
        </h1>

        <div class="columns">
          <div class="column">
            <h2 class="subtitle">Fly there</h2>
            <FlightSearchComponent id="flight-search-there"/>
          </div>
          <div class="column">
            <h2 class="subtitle">And back</h2>
            <FlightSearchComponent id="flight-search-back"/>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import FlightSearchComponent from './FlightSearchComponent.vue';

export default {
  components: {
    FlightSearchComponent,
  },
};
</script>

