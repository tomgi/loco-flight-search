require('../test_helper');

const request = require('supertest');
const nock = require('nock');
const server = require('../../server/app');
const jsonResponseExamples = require('./shared_examples/json_response_examples');

describe('routes: search', () => {
  const fromAirportCode = 'SYD';
  const toAirportCode = 'JFK';
  const date = '2019-01-01';

  const subject = async () => {
    this.response = await request(server.callback()).get(`/search/${fromAirportCode}/${toAirportCode}/${date}`);
  };

  describe('with successful response from locomote service', () => {
    const airlinesResponse = require('../fixtures/locomote_service/SU_and_MU_airlines.json');
    const SUFlightsResponse = require('../fixtures/locomote_service/SU_airline_flights.json');
    const MUFlightsResponse = require('../fixtures/locomote_service/MU_airline_flights.json');

    beforeEach(async () => {
      const searchQuery = {
        from: fromAirportCode,
        to: toAirportCode,
        date,
      };

      nock(process.env.LOCOMOTE_API_URL).get('/code-task/airlines').reply(200, airlinesResponse);
      nock(process.env.LOCOMOTE_API_URL).get('/code-task/flight_search/SU').query(searchQuery).reply(200, SUFlightsResponse);
      nock(process.env.LOCOMOTE_API_URL).get('/code-task/flight_search/MU').query(searchQuery).reply(200, MUFlightsResponse);
      await subject();
    });

    describe('it combines the responses from each airline', () => {
      const expected = SUFlightsResponse.concat(MUFlightsResponse);
      jsonResponseExamples.itBehavesLikeASuccessfulJsonResponse(this, expected);
    });
  });

  describe('with failed response from locomote service', () => {
    const errorMessage = 'something awful happened';

    beforeEach(async () => {
      nock(process.env.LOCOMOTE_API_URL).get('/code-task/airlines').replyWithError(errorMessage);
      await subject();
    });

    jsonResponseExamples.itBehavesLikeAFailureJsonResponse(this, errorMessage);
  });
});
