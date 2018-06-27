import $ from 'jquery';
import FlightSearchComponent from './flight_search_component';

const app = {
  init() {
    this.flightSearchThere = new FlightSearchComponent($('#flight-search-there'));
    this.flightSearchBack = new FlightSearchComponent($('#flight-search-back'));
  },
};

$(document).ready(() => app.init());
