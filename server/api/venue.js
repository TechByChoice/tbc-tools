const { api } = require( "./api" )

const createVenue = async venueData => {
  let {
    organizationId,
    name,
    capacity,
    address_1,
    address_2,
    city,
    region,
    postal_code,
    country,
    latitude,
    longitude,} = venueData;
  let response;

  response = await api.post(
    `/organizations/${ organizationId }/venues/`,
    {
      venue: {
        name,
        capacity,
        address: {
          address_1,
          address_2,
          city,
          region,
          postal_code,
          country,
          latitude,
          longitude,
        }
      },
    },
  ).catch( error => {
    return error
  } )

  return response

}
// TODO || FIX UPDATE VENUES
const updateVenue = async (venueId, venueData) => {
  let {
    name,
    capacity,
    address_1,
    address_2,
    city,
    region, // state in the US
    postal_code,
    country,
    latitude,
    longitude} = venueData;
  let response;
  console.log(venueId)
  response = await api.post(
    `/venues/${ venueId }`,
    {
      'venue': {
        'name': name,
        'capacity': capacity,
        'address': {
          'address_1':address_1,
          'address_2':address_2,
          'city':city,
          'region':region, // state in the US
          'postal_code':postal_code,
          'country':country,
          'latitude':latitude,
          'longitude':longitude,
        }
      }
    }
  ).catch( error => {
    return error
  } )
  console.log(response)
  return response

}
const listOrgVenues = async orgId => {
  let response;

  response = await api.get(
    `organizations/${ orgId }/venues/`,
  ).catch( error => {
    return error
  } )

  return response

}
const getVenue = async venueId => {
  let response;

  response = await api.get(
    `/venues/${ venueId }`,
  ).catch( error => {
    return error
  } )

  return response
}

module.exports = {
  createVenue,
  updateVenue,
  listOrgVenues,
  getVenue
};