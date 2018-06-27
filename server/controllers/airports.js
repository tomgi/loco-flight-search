const locomoteService = require('../services/locomote');

module.exports = async (ctx) => {
  const { query } = ctx.params;
  if (query.length < 2) {
    ctx.body = {};
  } else {
    const airports = await locomoteService.airports(query);
    ctx.body = airports;
  }
};
