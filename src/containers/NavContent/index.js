import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { withPreview } from 'gatsby-source-prismic-graphql';
import { Container, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';

import { LocaleContext } from '../../i18n';
import NavMenu from '../../components/NavMenu';
import NavWrapper from './NavWrapper';
import NavSearch from './NavSearch';
import Logo from '../../components/common/Logo';
import { NavFragment } from '../../fragments/NavFragment';

const RenderNavCMS = ({ prismic }) => {
  return (
    <LocaleContext.Consumer>
      {context => {
        return (
          <NavWrapper>
            <Container>
              <Row className="bottomBorderBelowLg">
                <Col md="2" lg="2" className="d-none d-lg-block" css={{ height: '8rem' }}>
                  <Logo
                    // eslint-disable-next-line max-len
                    src="https://res.cloudinary.com/jeanscentre/image/fetch/f_auto,q_auto:good/https://jeanscentre-static.joggroup.net/sys-master/images/h7c/h9b/8796166258718/jcc_logo.png"
                    alt="Logo"
                  />
                </Col>
                <Col xs="9" sm="10" md="10" lg="7">
                  <NavMenu cmsData={prismic} />
                </Col>
                <Col xs="3" sm="2" md="2" lg="3" className="navSearchWrapper" css={{ display: 'flex', alignItems: 'center', position: 'static' }}>
                  <NavSearch />
                </Col>
              </Row>
            </Container>
          </NavWrapper>
        );
      }}
    </LocaleContext.Consumer>
  );
};

const NavContent = () => {
  return <StaticQuery query={query} render={withPreview(RenderNavCMS, query, [NavFragment])} />;
};

NavContent.fragments = [NavFragment];

const query = graphql`
  query {
    prismic {
      allMain_navs(lang: "nl-be") {
        edges {
          node {
            nav_items {
              nav_item {
                ...NavFragment
              }
            }
          }
        }
      }
    }
  }
`;

RenderNavCMS.propTypes = {
  prismic: PropTypes.object
};

export default NavContent;
