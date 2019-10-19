const moment = require( "moment" )

const createEventData = eventData => {
  return {
    "name": {
      "html": eventData.title,
    },
    "start": {
      "timezone": eventData.timezone,
      "utc": moment().add( 1, "days" ).utc().format(), // TODO || ACCEPT DATE AND TIME FOR THIS FIELD
    },
    "end": {
      "timezone": eventData.timezone,
      "utc": moment().add( 2, "days" ).utc().format(), // TODO || ACCEPT DATE AND TIME FOR THIS FIELD
    },
    "currency": eventData.currency,
  }
}
const createEventDetailData = eventData => {
  return {
    description: {
      html: eventData.summary,
    },
    venue_id: eventData.venueId,
    online_event: eventData.onlineEvent,
    listed: true,
    shareable: true,
    capacity: eventData.capacity,
    category_id: eventData.categoryId,
    subcategory_id: eventData.subCategoriesId,
  }
}
const createEventDescription = eventData => {
  return `
    
      <h3>${ eventData.title }</h3>
       ${ eventData.description }

       
       <br/>
       <h4>About Tech By Choice</h4>
       <p>Tech By Choice is on a mission to increase the diversity within the STEAM (Science, Technology, Engineering, Art, Math) industry by offering low-to-no cost events, workshops and classes to anyone that identifies as a person of color, women, LGTBQ+, differently abled, or those aligned with the space we're creating.</p>
       <br/>
       <p>All attendees are expected to abide by 
        <a href='https://www.techbychoice.org/coc/'>Tech By Choice Code of Conduct</a>
       </p>
        <br/>
        <strong>This event is catered for protected groups, though all are welcome.</strong> 
    
  `
}

function getDescription( title, description ) {
  return `
    
      <h3>${ title }</h3>
       ${ description }

       
       <br/>
       <h4>About Tech By Choice</h4>
       <p>Tech By Choice is on a mission to increase the diversity within the STEAM (Science, Technology, Engineering, Art, Math) industry by offering low-to-no cost events, workshops and classes to anyone that identifies as a person of color, women, LGTBQ+, differently abled, or those aligned with the space we're creating.</p>
       <br/>
       <p>All attendees are expected to abide by 
        <a href='https://www.techbychoice.org/coc/'>Tech By Choice Code of Conduct</a>
       </p>
        <br/>
        <strong>This event is catered for protected groups, though all are welcome.</strong> 
    
  `
}

// TODO || BUILD OUT DESCRIPTION LIST
function getGuestDescription( { title, speakers } ) {
  return talks.map( talk => `
    <section>
      <h1>${ talk.title }</h1>
      <p>${ talk.description.replace( /\n/g, "<br />" ) }</p>
      <p>
        Animé par 
        ${ talk.speakers.map( speaker => `<a rel='author' href='${ speaker.link }'>${ speaker.name }</a>` ).join( ", " ) }.
      </p>
    </section>
  ` ).map( emojiStrip ).join( "" )
}

module.exports = {
  createEventData,
  createEventDetailData,
  createEventDescription,
}