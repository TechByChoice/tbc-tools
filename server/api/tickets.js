const { api } = require( ".//api" )

const createEventTickets = async ( eventId, eventData, donation ) => {
  let response;

  // TODO : LET USER SET HOW MANY DONATION TICKETS
  response = await api.post(
    `/events/${ eventId }/ticket_classes/`,
    {
      ticket_class: {
        name: eventData.ticketName,
        donation: donation,
        free: !donation,
        minimum_quantity: 1,
        maximum_quantity: donation ? Math.ceil(eventData.ticketMaxQuantity / 2) : eventData.ticketMaxQuantity,
        quantity_total: eventData.ticketMaxTotal,
        delivery_methods: [ "electronic" ],
      },
    },
  ).catch( error => {
    // console.log( response )
    return error
  } )

  if ( eventData.donation ) {
    eventData.donation = false
    response = await createEventTickets( eventId, eventData, true )
  }

  return response

}


module.exports = {
  createEventTickets,
}