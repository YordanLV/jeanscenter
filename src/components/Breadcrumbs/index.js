import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Container, Row, Col } from "reactstrap";
import { uid } from "react-uid";
import PropTypes from "prop-types";

import BreadcrumbItem from "../BreadcrumbItem";
import { I18n } from "../../i18n";

const BreadcrumbsWrapper = styled.div`
  display: flex;
  margin-top: 2.7rem;
  margin-bottom: 2.7rem;
  background: transparent;
  font-size: 1.2rem;
`;

const Breadcrumbs = ({ breadcrumbsArray, location, isPdp }) => {
  const [urlElements, setUrlElements] = useState([]);

  // if location is passed the route chenged, so rerender is required
  useEffect(() => {
    if (!breadcrumbsArray) {
      const pathNames = window.location.pathname
        .split("/")
        .filter(e => e !== "");
      setUrlElements(pathNames);
    }
  }, [location || ""]);

  return (
    <Container className='d-none d-xl-block'>
      <Row>
        <Col sm='12'>
          <BreadcrumbsWrapper>
            <BreadcrumbItem text='Home' href='/' />
            {/* if breadcrumbsArray is passed as props render breadcrumbsArray otherwise render breadcrumbs from url */}
            {breadcrumbsArray
              ? breadcrumbsArray.map(el => {
                  const text = I18n(el.text, true);
                  return (
                    <BreadcrumbItem text={text} href={el.url} key={uid(el)} />
                  );
                })
              : urlElements.map((e, i) => {
                  // remove pdp name from breadcrumbs
                  if (isPdp && i === urlElements.length - 2) return;

                  const breadcrumbUrl = urlElements
                    .filter((href, index) => index <= i)
                    .join("/");
                  const text = e.replace(/-/g, " ");
                  return (
                    <BreadcrumbItem
                      text={text}
                      href={"/" + breadcrumbUrl}
                      key={uid(e)}
                    />
                  );
                })}
          </BreadcrumbsWrapper>
        </Col>
      </Row>
    </Container>
  );
};

Breadcrumbs.propTypes = {
  breadcrumbsArray: PropTypes.array,
  location: PropTypes.object,
  isPdp: PropTypes.bool
};

export default Breadcrumbs;
