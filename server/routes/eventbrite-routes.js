const Router = require( "koa-router" )
const eventHelper = require( "../api/evnets" )
const ticketHelper = require( "../api/tickets" )
const { api } = require( "../api/api" )
const config = require( "../config/config" )
const TBC_ORG_ID = config.eventbrite.parentOrg

const event = new Router( {
  prefix: "/events",
} )

event.post( "/new", async ctx => {
  let response
  let eventId
  response = await api.post(
    `organizations/${ TBC_ORG_ID }/events/`,
    {
      "event": {
        ...eventHelper.createEventData( ctx.request.body ),
      },
    },
  ).then( (res) => {
    eventId = res.data.id;
  } ).catch( error => {
    ctx.body = { status: response }
    ctx.status = 400
    return false
  } )


  response = await api.post(
    `events/${ eventId }/`,
    {
      event: {
        ...eventHelper.createEventDetailData( ctx.request.body ),
      },
    },
  ).catch( error => {
    ctx.body = { status: error.response.data }
    ctx.status = error.response.data.status_code
    return false
  } )

  response = await api.get(
    `events/${ eventId }/structured_content/1/`,
    {
      "modules": [
        {
          "type": "text",
          "data": {
            "body": {
              "text": eventHelper.createEventDescription( ctx.request.body ),
            },
          },
        },
      ],

    },
  ).catch( error => {
    ctx.body = { status: error.response.data }
    ctx.status = error.response.data.status_code
    return false
  } )

  response = await ticketHelper.createEventTickets( eventId, ctx.request.body, false )
  if ( response.status !== 200 ) {
    console.warn( "!200 response" )
    ctx.body = { status: response.response.data }
    ctx.status = response.response.data.status_code
  } else {
    console.warn( response )
    ctx.body = { status: response.data || response.response }
    ctx.status = 200
  }

  return true
} )

module.exports = event