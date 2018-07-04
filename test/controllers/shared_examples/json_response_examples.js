module.exports = {
  itBehavesLikeASuccessfulJsonResponse: (ctx, expectedPayload) => {
    it('should return a success status code', () => {
      expect(ctx.response.status).toEqual(200);
    });

    it('should have a correct content type', () => {
      expect(ctx.response.type).toEqual('application/json');
    });

    it('should have a correct payload body', () => {
      expect(ctx.response.body).toEqual(expectedPayload);
    });
  },

  itBehavesLikeAFailureJsonResponse: (ctx, errorMessage) => {
    it('should return a failure status code', () => {
      expect(ctx.response.status).not.toEqual(200);
    });

    it('should have a correct content type', () => {
      expect(ctx.response.type).toEqual('application/json');
    });

    it('should have a correct payload body', () => {
      expect(ctx.response.body).toHaveProperty('error');
      expect(ctx.response.body.error).toMatch(errorMessage);
    });
  },
};
