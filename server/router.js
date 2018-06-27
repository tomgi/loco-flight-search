const Router = require('koa-router');
const airlinesController = require('./controllers/airlines');
const airportsController = require('./controllers/airports');
const flightSearchController = require('./controllers/flight_search');

const router = new Router();

router.get('/airlines', airlinesController);
router.get('/airports/:query', airportsController);
router.get('/search/:from/:to/:date', flightSearchController);

module.exports = router;
