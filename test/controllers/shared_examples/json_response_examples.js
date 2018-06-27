module.exports = {
  itBehavesLikeASuccessfulJsonResponse: (context, expectedPayload) => {
    it('should return a success status code', () => {
      expect(context.response.status).toEqual(200);
    });

    it('should have a correct content type', () => {
      expect(context.response.type).toEqual('application/json');
    });

    it('should have a correct payload body', () => {
      expect(context.response.body).toEqual(expectedPayload);
    });
  },

  itBehavesLikeAFailureJsonResponse: (context, errorMessage) => {
    it('should return a failure status code', () => {
      expect(context.response.status).not.toEqual(200);
    });

    it('should have a correct content type', () => {
      expect(context.response.type).toEqual('application/json');
    });

    it('should have a correct payload body', () => {
      expect(context.response.body).toHaveProperty('error');
      expect(context.response.body.error).toMatch(errorMessage);
    });
  },
};
