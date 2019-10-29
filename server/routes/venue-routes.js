const { createVenue, updateVenue, getVenue, listOrgVenues } = require("../api/venue")
const Router = require( "koa-router" )
const eventHelper = require( "../api/evnets" )
const ticketHelper = require( "../api/tickets" )
const { api } = require( "../api/api" )

const event = new Router( {
  prefix: "/venues",
} )
// create a venue
event.post( "/new", async ctx => {
  let response
  response = await createVenue(ctx.request.body)
    .catch((error)=>{
      console.log(error)
    ctx.body = {status: error}
    ctx.status = 400
    return false
  })

  ctx.body = { status: response.data || response.response }
  ctx.status = 200
  return true
} )
event.post( "/:venueId", async ctx => {
  let response
  response = await updateVenue(ctx.params.venueId, ctx.request.body)
  .catch((error)=>{
    console.log(error)
    ctx.body = {status: error}
    ctx.status = 400
    return false
  })

  ctx.body = { status: 200, data: response.data || response.response }
  ctx.status = 200
  return true
} )
event.get( "/:venueId", async ctx => {
  let response
  response = await getVenue(ctx.params.venueId, ctx.request.body)
  .catch((error)=>{
    console.log(error)
    ctx.body = {status: error}
    ctx.status = 400
    return false
  })

  ctx.body = { status: 200, data: response.data || response.response }
  ctx.status = 200
  return true
} )
event.get( "/list/:orgId", async ctx => {
  let response
  response = await listOrgVenues(ctx.params.orgId)
  .catch((error)=>{
    console.log(error)
    ctx.body = {status: error}
    ctx.status = 400
    return false
  })

  ctx.body = { status: 200, data: response.data || response.response }
  ctx.status = 200
  return true
} )

module.exports = event