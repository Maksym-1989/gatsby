import React from 'react';
import { Link } from 'gatsby';
import { graphql } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

import Layout from '../components/Layout';
import Container from '../components/reusable/Container';
import Seo from '../components/Seo';

const ExamplePage = ({ data }) => {
  const mdxContent = data.allMdx.nodes;
  console.log(mdxContent);

  return (
    <Layout>
      <section>
        <Container>
          <Link to="/">Go back to the homepage</Link>
          <h1>Second Page</h1>
          <p>Welcome to page 2</p>

          <StaticImage
            src="../images/example.png"
            loading="eager"
            width={64}
            quality={95}
            formats={['auto', 'webp', 'avif']}
            alt=""
          />

          <ul>
            {mdxContent.map(item => (
              <li key={item.id}>
                <p>{item.frontmatter.date}</p>
                <p>{item.frontmatter.language}</p>
                <p>{item.frontmatter.name}</p>
                <p>{item.frontmatter.description}</p>
                <div
                  className="post-body"
                  dangerouslySetInnerHTML={{ __html: item.body }}
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </Layout>
  );
};

export const Head = () => <Seo title="Page two" />;

export const query = graphql`
  query ($language: String!) {
    allMdx(
      filter: {
        frontmatter: { groupId: { eq: "main" }, language: { eq: $language } }
      }
    ) {
      nodes {
        id
        frontmatter {
          date
          language
          name
          description
        }
        body
      }
    }
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;

export default ExamplePage;
