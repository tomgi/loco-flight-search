module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      error: (process.env.NODE_ENV !== 'production') ? err.message : 'Something went wrong. Try again or contact support.',
    };
    ctx.app.emit('error', err, ctx);
  }
};
