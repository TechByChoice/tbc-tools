const Router = require('koa-router');
const router = new Router();

const event = require('./eventbrite-routes');


router.use('/api', event.routes());

module.exports = router;
