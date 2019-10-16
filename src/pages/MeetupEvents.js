import React                       from "react"
import { useStaticQuery, graphql } from "gatsby"
import SEO                         from "../components/seo"
import Layout                      from "../components/layout"

const MeetupEvents = () => {
  const data = useStaticQuery( graphql`
      {
          allMeetupEvent{
              edges {
                  node {
                      id
                      name
                      local_time
                      local_date
                      rsvp_limit
                      duration
                      created
                      time
                      yes_rsvp_count
                      venue {
                          name
                          address_1
                          city
                          state
                          zip
                          lat
                          lon
                          id
                      }
                      visibility
                      waitlist_count
                      description
                      group {
                          name
                          state
                          id
                      }
                  }
              }
          }
      }
  ` )
  return (
    <Layout>
      <SEO title="Meetup" />
      <h3>MeetUp Events</h3>
      <ul>
        { data.allMeetupEvent.edges.map( ( item, i ) => (
          <li>
            <p>{ item.node.name }</p>
            <p>Hosted By: { item.node.group.name }</p>
            <p>Date: { item.node.local_date }</p>
            <p>Time: { item.node.time }</p>
            <p>RSVP Count: { item.node.yes_rsvp_count }</p>
            <p>Duration: { item.node.duration }</p>
            <p>
              Venue Information
              { item.node.venue ? (
                <ul>
                  <li>
                            <span data-ref={ item.node.venue.id }>
                                { item.node.venue.name }
                            </span>
                  </li>
                  <li>
                    { item.node.venue.address_1 }
                  </li>
                  <li>
                    { item.node.venue.city }
                  </li>
                  <li>
                    { item.node.venue.state }
                  </li>
                  <li>
                    { item.node.venue.zip }
                  </li>
                </ul>) : ": Online" }
            </p>
          </li>
        ) ) }
      </ul>
    </Layout>
  )
}

export default MeetupEvents