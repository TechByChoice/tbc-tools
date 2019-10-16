import React                       from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout                      from "../components/layout"

const MeetupGroups = () => {
  const data = useStaticQuery( graphql`
      {
          allMeetupGroup{
              group(field: id) {
                  totalCount
                  fieldValue
                  nodes {
                      city
                      description
                      created
                      id
                      members
                      urlname
                      name
                  }
              }          
          }
      }
  ` )
  return (

    <Layout>
      <h3>Groups Meetups</h3>
      <ul>
        {data.allMeetupGroup.group.map((item, i) => (
          <li key={i}>
            <p>
              {item.nodes[0].name}
              <ul>
                <li>
                  <a target="_blank"
                     rel="noopener noreferrer"
                     href={"https://www.meetup.com/"+item.nodes[0].urlname}>Link</a>
                </li>
                <li>
                  Members: {item.nodes[0].members}
                </li>
                <li>
                  Meetup ID: {item.nodes[0].id}
                </li>
                <li>
                  City: {item.nodes[0].city}
                </li>
                <li>
                  Total Count: {item.nodes.totalCount}
                </li>
              </ul>
            </p>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default MeetupGroups