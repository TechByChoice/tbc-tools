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
  ).then( ( res ) => {
    eventId = res.data.id
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

  response = await api.post(
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

event.post( "/publish/:eventId/", async ctx => {
  let response
  response = await api.post(
    `events/${ ctx.params.eventId }/publish/`,
  ).catch( ( error ) => {
    console.log( error )
    ctx.body = { status: error }
    ctx.status = 400
    return false
  } )

  ctx.body = { status: response.data || response.response }
  ctx.status = 200
  return true
} )

event.post( "/unpublish/:eventId/", async ctx => {
  let response
  response = await api.post(
    `events/${ ctx.params.eventId }/unpublish/`,
  ).catch( error => {
    console.log( error )
    ctx.body = { status: error }
    ctx.status = 400
    return false
  } )

  ctx.body = { status: response.data || response.response }
  ctx.status = 200
  return true
} )

event.post( "/cancel/:eventId/", async ctx => {
  let response
  response = await api.post(
    `events/${ ctx.params.eventId }/cancel/`,
  ).catch( error => {
    console.log( error )
    ctx.body = { status: error }
    ctx.status = 400
    return false
  } )

  ctx.body = { status: response.data || response.response }
  ctx.status = 200
  return true
} )
event.post( "/delete/:eventId/", async ctx => {
  let response
  response = await api.delete(
    `events/${ ctx.params.eventId }/`,
  ).catch( error => {
    console.log( error )
    ctx.body = { status: error }
    ctx.status = 400
    return false
  } )

  ctx.body = { status: response.data || response.response }
  ctx.status = 200
  return true
} )

// event.post("/edit/:eventId/", async ctx => {
//   let response;
//   response = await api.post(
//     `events/${ctx.params.eventId}/`,
//     {
//       'event': {
//         'name': {
//           'html': formData.eventName
//         },
//         'start': {
//           'timezone': 'America/Los_Angeles',
//           'utc': formData.startTime + 'T02:00:00Z'
//         },
//         'end': {
//           'timezone': 'America/Los_Angeles',
//           'utc': formData.endTime + 'T02:00:00Z'
//         },
//         'currency': 'USD'
//       }
//
//     }
//   ).catch( error => {
//     console.log(error,'error')
//     ctx.body = { status: error }
//     ctx.status = 400
//     return false
//   } )
//   response = await api.post(
//     `events/${ctx.params.eventId}/`,
//     {
//       'event': {
//         'description': {
//           'html': formData.description
//         },
//         'online_event': formData.onlineEvent,
//         'listed': true,
//         'shareable': true,
//         'venue_id': formData.venue,
//         'capacity': formData.capacity,
//         'category_id': formData.category,
//         'subcategory_id': formData.subCategories
//       }
//     }
//   ).catch( error => {
//     console.log(error,'error')
//     ctx.body = { status: error }
//     ctx.status = 400
//     return false
//   } )
//
//
//
//
// })

event.post( "/edit/:eventId/", async ctx => {
  let response
  response = await api.post(
    `events/${ ctx.params.eventId }/events/`,
    {
      "event": {
        ...eventHelper.createEventData( ctx.request.body ),
      },
    },
  ).catch( error => {
    ctx.body = { status: response }
    ctx.status = 400
    return false
  } )


  response = await api.post(
    `events/${ ctx.params.eventId }/`,
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

  response = await api.post(
    `events/${ ctx.params.eventId }/structured_content/1/`,
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
    console.log(error)
    ctx.body = { status: error.response.data }
    ctx.status = error.response.data.status_code
    return false
  } )

  if ( response.status !== 200 ) {
    console.warn( "!200 response" )
    console.warn( response )
    ctx.body = { status: response }
    ctx.status = 400
  } else {
    console.warn( response )
    ctx.body = { status: response }
    ctx.status = 200
  }

  return true
} )

module.exports = event