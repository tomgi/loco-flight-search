require('../test_helper');

const server = require('../../server/app');
const request = require('supertest');
const jsonResponseExamples = require('./shared_examples/json_response_examples');
const nock = require('nock');

describe('routes: airlines', () => {
  const subject = async () => {
    this.response = await request(server.callback()).get('/airlines');
  };

  const locomoteServiceNock = nock(process.env.LOCOMOTE_API_URL).get('/code-task/airlines');

  describe('with successful response from locomote service', () => {
    const airlinesResponse = require('../fixtures/locomote_service/SU_and_MU_airlines.json');

    beforeEach(async () => {
      locomoteServiceNock.reply(200, airlinesResponse);
      await subject();
    });

    describe('it just passes the response through', () => {
      jsonResponseExamples.itBehavesLikeASuccessfulJsonResponse(this, airlinesResponse);
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
