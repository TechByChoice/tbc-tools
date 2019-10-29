import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

const Directory = () => {
  const data = useStaticQuery(graphql`
      query DirectoryQuery {
          directory: allAirtable(
              filter: { table: { eq: "TBC Directory" } }
              sort: { fields: data___Name, order: DESC }
          ) {
              nodes {
                  data {
                      Name
                      Pronouns
                      Zip_Code
                      Title
                  }
                  recordId
              }
          }
      }
  `);

  return (
    <div>
      <h3>Directory</h3>
      <ul>
        {data.directory.nodes.map((item, i) => (
          <li key={item.recordId}>
            <p>
              {item.data.Name}, {item.data.Pronouns}, {item.data.Zip_Code}, {item.data.Title}
            </p>
          </li>
        ))}
      </ul>
      <h3>Chapters</h3>
    </div>
  );
};

export default Directory;