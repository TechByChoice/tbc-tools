const config = require("../config/config")
let activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"
console.log(`Using environment config: '${activeEnv}'`)
require("dotenv").config({
  path: `${activeEnv}.env`,
})

module.exports = {
  siteMetadata: {
    title: `TBC | Event Management`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-source-airtable`,
      options: {
        // apiKey: process.env.YOUR_AIRTABLE_KEY,
        // baseId: process.env.YOUR_AIRTABLE_BASE_ID,
        apiKey: 'keyCDI9g6pLU2Le5i',
        tables: [
          {
            baseId: 'app2OXtbMVkriy7KX',
            tableName: `TBC Directory`,
            defaultValues: {
              //currently does not accept null / undefined. use empty string instead
              //and perform your conditional logic on name_of_field.length > 0 ? condition_1 : condition_2
              NAME_OF_FIELD_THAT_WILL_OTHERWISE_NOT_BE_RETURNED_IF_ALL_VALUES_ARE_BLANK: ""
              //... etc
            }
          }
        ],
        queryName: 'testing'
      }
    },
    {
      resolve: `gatsby-source-meetup`,
      options: {
        // Learn about environment variables: https://gatsby.app/env-vars
        // Your Meetup.com API key can be retrieved here: https://secure.meetup.com/fr-FR/meetup_api/key/
        key: `5f796b1c524b5f47c37735f4d1e491a`,
        // Mandatory: the URL name of a Meetup Group.
        // See the URL of the group page, e.g. https://www.meetup.com/fr-FR/jamstack-paris
        groupUrlName: "Tech-By-Choice-Oakland",
        // Optional parameters for retrieving Events, see full documentation at
        // https://www.meetup.com/meetup_api/docs/:urlname/events/?uri=%2Fmeetup_api%2Fdocs%2F%3Aurlname%2Fevents%2F#list
        status: "upcoming,past",
        desc: "true",
        page: 10
      },
    },
    {
      resolve: `gatsby-source-meetup`,
      options: {
        // Learn about environment variables: https://gatsby.app/env-vars
        // Your Meetup.com API key can be retrieved here: https://secure.meetup.com/fr-FR/meetup_api/key/
        key: `5f796b1c524b5f47c37735f4d1e491a`,
        // Mandatory: the URL name of a Meetup Group.
        // See the URL of the group page, e.g. https://www.meetup.com/fr-FR/jamstack-paris
        groupUrlName: "Tech-By-Choice",
        // Optional parameters for retrieving Events, see full documentation at
        // https://www.meetup.com/meetup_api/docs/:urlname/events/?uri=%2Fmeetup_api%2Fdocs%2F%3Aurlname%2Fevents%2F#list
        status: "upcoming,past",
        desc: "true",
        page: 10
      },
    },
    {
      resolve: `gatsby-source-eventbrite`,
      options: {
        organizationId: config.eventbrite.parentOrg,
        accessToken: config.eventbrite.oath,
        // OPTIONAL: Defaults are Events and Venues
        entity: ['events', 'venues']
      },
    },
    {
      resolve: "gatsby-theme-auth0-ts",
      options: {
        /*
         Required: for more information on these values
         see https://auth0.com/docs/libraries/auth0js/v9#initialization
         */
        auth0Domain: process.env.AUTH0_DOMAIN,
        auth0ClientID: process.env.AUTH0_CLIENT_ID,
        auth0RedirectUri: process.env.AUTH0_CALLBACK_URL,

        /* Optional */
        // auth0Audience: undefined,
        // auth0ResponseType: "token id_token",
        // auth0Scope: "openid profile",
      },
    }
    // {
    //   resolve: "gatsby-source-custom-api",
    //   options: {
    //     url: {
    //       development: "http://localhost:3007", // on "gatsby develop"
    //       production: "https://my-remote-api.com" // on "gatsby build"
    //     }
    //   }
    // }
  ],
}