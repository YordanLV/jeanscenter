import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import { uid } from 'react-uid';
import { withPreview } from 'gatsby-source-prismic-graphql';

import Auth from '../components/Auth';
import Layout, { LocaleContext } from '../layout';
import CmsRow from '../cms-components/CmsRow';
import { HomepageFragment } from '../fragments/HomepageFragment';

const RenderCMS = ({ prismic }) => {
  return (
    <LocaleContext.Consumer>
      {context => {
        return prismic[context.lang].edges[0].node.body.map(row => (
          <Container key={uid(row)}>
            <Row>
              <Col md="12">
                <CmsRow type={row.type} data={row} />
              </Col>
            </Row>
          </Container>
        ));
      }}
    </LocaleContext.Consumer>
  );
};

const IndexPage = ({ pageContext }) => {
  return (
    <Layout pageContext={pageContext.locale}>
      <Auth hideDefault={true} />
      <StaticQuery query={query} render={withPreview(RenderCMS, query, [HomepageFragment])} />
    </Layout>
  );
};

IndexPage.fragments = [HomepageFragment];

Container.propTypes = {
  fluid: PropTypes.bool
};

RenderCMS.propTypes = {
  prismic: PropTypes.object
};

IndexPage.propTypes = {
  pageContext: PropTypes.shape({
    locale: PropTypes.object
  })
};

const query = graphql`
  query {
    prismic {
      nl: allHomepages(lang: "nl-be") {
        edges {
          node {
            ...HomepageFragment
          }
        }
      }
    }
  }
`;

export default IndexPage;
