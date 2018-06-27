const r2 = require('r2');
const URI = require('urijs');
const moment = require('moment');
require('urijs/src/URITemplate'); // https://github.com/medialize/URI.js/issues/162

const DATE_FORMAT = 'YYYY-MM-DD';
const AIRLINES_PATH = '/code-task/airlines';
const AIRPORTS_PATH = '/code-task/airports';
const FLIGHT_SEARCH_PATH = '/code-task/flight_search/{airlineCode}';

function fetchJson(uri) {
  const href = uri.normalize().href();
  console.info(`Retrieving data from ${href}`);
  return r2(href).json;
}

function apiUri() {
  return URI(process.env.LOCOMOTE_API_URL);
}

module.exports = {
  airlines() {
    const uri = apiUri().pathname(AIRLINES_PATH);
    return fetchJson(uri);
  },

  airports(query) {
    const uri = apiUri().pathname(AIRPORTS_PATH).query({ q: query });
    return fetchJson(uri);
  },

  flightSearchSingleAirline(airlineCode, from, to, date) {
    const path = URI.expand(FLIGHT_SEARCH_PATH, { airlineCode });
    const uri = apiUri().pathname(path).query({ from, to, date: moment(date).format(DATE_FORMAT) });
    return fetchJson(uri);
  },

  async flightSearchAllAirlines(from, to, date) {
    const airlines = await this.airlines();
    const airlineCodes = airlines.map(airline => airline.code);

    const searchFlights = airlineCodes
      .map(airlineCode => this.flightSearchSingleAirline(airlineCode, from, to, date));
    const flights = await Promise.all(searchFlights);
    return [].concat(...flights);
  },
};
