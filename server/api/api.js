const axios = require("axios");
const config = require( "../../config/config" )
const authToken = config.eventbrite.oath

exports.api = axios.create( {
  baseURL: 'https://www.eventbriteapi.com/v3/',
  mode: 'cors',
  withCredentials: false,
  credentials: 'cross-origin',
  headers: {
    'Authorization': `Bearer ${ authToken }`,
    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
  }
} );
