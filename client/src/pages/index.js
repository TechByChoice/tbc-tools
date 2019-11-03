import React from "react"
import { Link } from "gatsby"

import Layout       from "../components/layout"
import Image        from "../components/image"
import SEO          from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Tech By Choice </h1>

    <Link to="/Login">Login</Link>
      <br/>
    <Link to="/account">Account</Link>


  </Layout>
)

export default IndexPage
