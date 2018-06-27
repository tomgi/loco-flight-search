const locomoteService = require('../services/locomote');

module.exports = async (ctx) => {
  const { from, to, date } = ctx.params;

  const flights = await locomoteService.flightSearchAllAirlines(from, to, date);
  ctx.body = flights;
};
