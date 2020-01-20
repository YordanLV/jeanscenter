import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import PropTypes from "prop-types";

import Auth from "../components/Auth";
import Layout from "../layout";
import WhiteBox from "../components/common/WhiteBox";
import Breadcrumbs from "../components/Breadcrumbs";

const NewsletterPage = ({ pageContext }) => {
  useEffect(() => {
    const url = new URL(window.location.href);
    const email = url.searchParams.get("email");

    // eslint-disable-next-line max-len
    document.getElementById(
      "newsletterframe"
    ).src = `https://e.jeanscentre.nl/3/4/1063/45/E2kkZtbvTVjt_TJ5aVyaZI83r8uuLEOnzsg4RDLdBqL6zaFjrMy0gYyO8wyw6pGZ?email=${email}`;
  });

  return (
    <Layout pageContext={pageContext.locale}>
      <Auth hideDefault={true} />
      <Breadcrumbs />
      <Container>
        <Row>
          <Col md='12'>
            <WhiteBox css={{ marginTop: "1rem" }}>
              <iframe
                id='newsletterframe'
                src=''
                scrolling='no'
                width='100%'
                height='700'
                frameBorder='0'
              />
            </WhiteBox>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

NewsletterPage.propTypes = {
  pageContext: PropTypes.shape({
    locale: PropTypes.object
  })
};

export default NewsletterPage;
