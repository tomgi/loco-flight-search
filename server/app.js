require('dotenv').config();

const Koa = require('koa');
const helmet = require('koa-helmet');
const koaLogger = require('koa-logger');
const koaStatic = require('koa-static');
const router = require('./router');
const errorHandler = require('./middleware/error_handler');

const app = new Koa();

app
  .use(errorHandler)
  .use(helmet())
  .use(koaLogger())
  .use(koaStatic('./public'))
  .use(router.routes())
  .use(router.allowedMethods());

if (['production', 'test'].includes(process.env.NODE_ENV)) {
  // serve precompiled assets
  app.use(koaStatic('./dist'));
} else {
  // auto recompile assets on changes
  // allowing this dev-only code to access devDependencies
  /* eslint-disable global-require, import/no-extraneous-dependencies */
  const koaWebpack = require('koa-webpack');
  koaWebpack({ config: require('../webpack.dev.js') })
    .then(webpackMiddleware => app.use(webpackMiddleware));
  /* eslint-enable */
}

app.on('error', (err) => {
  console.log(err);
});

module.exports = app;
