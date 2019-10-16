import React from "react"
import { Link } from "gatsby"

import Layout       from "../components/layout"
import Image        from "../components/image"
import SEO          from "../components/seo"
// import Directory    from "../components/Directory"
// import MeetupGroups from "../components/MeetupGroups"
import MeetupEvents from "./MeetupEvents"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Tech By Choice Event Management</h1>
    <p>Make event planning simple by creating &amp; tracking events here</p>
    <p>Useing Eventbrite, Meetup, or something new? We got you covered.</p>

    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/MeetupEvents/">View Meetups</Link>
    <Link to="/Eventbrite/">View Eventbrite</Link>
  </Layout>
)

export default IndexPage
