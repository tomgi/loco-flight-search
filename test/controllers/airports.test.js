require('../test_helper');

const request = require('supertest');
const nock = require('nock');
const server = require('../../server/app');
const jsonResponseExamples = require('./shared_examples/json_response_examples');

describe('routes: airports', () => {
  const sampleAirportCode = 'SYD';
  const locomoteServiceNock = nock(process.env.LOCOMOTE_API_URL).get('/code-task/airports').query({ q: sampleAirportCode });

  const subject = async () => {
    this.response = await request(server.callback()).get(`/airports/${sampleAirportCode}`);
  };

  describe('with successful response from locomote service', () => {
    const airportsResponse = require('../fixtures/locomote_service/Sydney_airports.json');

    beforeEach(async () => {
      locomoteServiceNock.reply(200, airportsResponse);
      await subject();
    });

    describe('it just passes the response through', () => {
      jsonResponseExamples.itBehavesLikeASuccessfulJsonResponse(this, airportsResponse);
    });
  });

  describe('with failed response from locomote service', () => {
    const errorMessage = 'something awful happened';

    beforeEach(async () => {
      locomoteServiceNock.replyWithError(errorMessage);
      await subject();
    });

    jsonResponseExamples.itBehavesLikeAFailureJsonResponse(this, errorMessage);
  });
});
