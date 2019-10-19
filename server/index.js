const Koa = require( "koa" )
const bodyParser = require('koa-bodyparser')
const Router = require( "koa-router" )
const port = 3007;
const logger = require("koa-logger")
const app = new Koa()
const router = new Router()
const routes = require('./routes/index');
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
});

router.get( "/", ( ctx, next ) => {
  ctx.body = "Hello World!"
} )
// app.use( router.routes() )
// app.use( router.allowedMethods() )

app.use(bodyParser())
    .use(routes.routes())
    .use(router.allowedMethods());

const server = app.listen( port );
module.exports = server;