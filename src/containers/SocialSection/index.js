import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { StaticQuery, graphql } from 'gatsby';
import { withPreview } from 'gatsby-source-prismic-graphql';
import { uid } from 'react-uid';

import Link from '../../components/Link';
import SocialSectionWrapper from './SocialSectionWrapper';
import FooterTitle from './FooterTitile';
import Icon from './Icon';
import NewsForm from './NewsForm';
import { LocaleContext } from '../../layout';
import { SocialFragment } from '../../fragments/SocialFragment';
const SocialSectionCMS = data => {
  return (
    <LocaleContext.Consumer>
      {context => {
        const socialData = data.prismic[context.lang].edges[0].node.body[0].fields;
        return (
          <SocialSectionWrapper>
            <Container>
              <Row>
                <Col xs="12" sm="12" md="12" lg="4" xl="5" css={{ display: 'flex', alignItems: 'center' }}>
                  <FooterTitle>
                    <span>volg</span> ons
                  </FooterTitle>
                  {socialData.map(el => {
                    return (
                      <Link to={el.url.url} title="" target="_blank" key={uid(el)}>
                        <Icon icon={el.icon[0].text}>
                          <span>{el.text[0].text}</span>
                        </Icon>
                      </Link>
                    );
                  })}
                </Col>
                <Col className="social-section__right" xs="12" sm="12" md="12" lg="8" xl="7" css={{ display: 'flex', alignItems: 'center' }}>
                  <FooterTitle>
                    <span>jc</span> nieuwsbrief
                  </FooterTitle>
                  <NewsForm />
                </Col>
              </Row>
            </Container>
          </SocialSectionWrapper>
        );
      }}
    </LocaleContext.Consumer>
  );
};

const SocialSection = () => <StaticQuery query={query} render={withPreview(SocialSectionCMS, query, [SocialFragment])} />;

SocialSection.fragments = [SocialFragment];

const query = graphql`
  query {
    prismic {
      nl: allSocials(lang: "nl-be") {
        edges {
          node {
            ...SocialFragment
          }
        }
      }
    }
  }
`;

export default SocialSection;
