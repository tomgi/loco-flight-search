import flightSearchComponentExamples from './shared_examples/flight_search_component_examples';

describe('Searching flights', () => {
  flightSearchComponentExamples.behavesLikeAFlightSearchComponent('#flight-search-there');
  flightSearchComponentExamples.behavesLikeAFlightSearchComponent('#flight-search-back');
});
