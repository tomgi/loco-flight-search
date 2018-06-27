const locomoteService = require('../services/locomote');

module.exports = async (ctx) => {
  const airlines = await locomoteService.airlines();
  ctx.body = airlines;
};
