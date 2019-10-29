const Router = require('koa-router');
const router = new Router();

const event = require('./eventbrite-routes');
const venue = require('./venue-routes');


router.use('/api', event.routes());
router.use('/api', venue.routes());

module.exports = router;
