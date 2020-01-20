import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";
import styled from "@emotion/styled";
import { I18n } from "../../i18n";
import localStorage from "../../util/localstorage";

import Price from "../../components/Price";
import TextDropdown from "../../components/common/TextDropdown";
import CardCodeForm from "./CartCodeForm";
import Button from "../../components/common/Button";
import HR from "../../components/common/HR";
import Link from "../../components/Link";

const TotalPriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2.5rem;
  margin-bottom: 3rem;
  font-size: 2.2rem;
  .total-price--bold {
    font-family: "Century Gothic W01 Bold", sans-serif;
    color: #212529;
  }
  span {
    margin-left: 1rem;
    font-family: "Century Gothic W01", sans-serif;
    font-size: 1.4rem;
    font-weight: 400;
  }
`;

const PriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  font-size: 1.6rem;
  span {
    font-family: "Century Gothic W01 Bold", sans-serif;
    color: ${props => props.priceColor || "#212529"};
  }
`;

const CartFooter = ({
  isBasket,
  isCheckout,
  isOnlyInCart,
  cartView,
  isUserLogged
}) => {
  const JCPoints = cartView && Math.floor(cartView.total.centAmount / 100);
  const basePath = localStorage.getItem("lastVisitedListerPage");
  const searchTerms = localStorage.getItem("tweakwiseSearchParams");
  const pathForContinueShopping = searchTerms
    ? `${basePath}?${searchTerms}`
    : basePath;
  return (
    <>
      {!isBasket && (
        <Row css={{ marginTop: "4rem" }}>
          {isOnlyInCart && (
            <Col sm='12' md='6' lg='6'>
              <TextDropdown text={I18n("Enter a discount code", true)}>
                <CardCodeForm />
              </TextDropdown>
            </Col>
          )}

          <Col
            sm='12'
            md={{ size: isCheckout ? 6 : 5, offset: isCheckout ? 6 : 1 }}
            lg={{ size: isCheckout ? 12 : 4, offset: isCheckout ? 0 : 2 }}
          >
            <PriceWrapper>
              <div>{I18n("Subtotal")}:</div>
              {cartView && (
                <Price fontSize='1.6rem' price={cartView.subtotal.centAmount} />
              )}
            </PriceWrapper>
            <PriceWrapper priceColor='#91c400'>
              {cartView &&
                cartView.totalDiscount.centAmount > 0 && (
                  <Fragment>
                    <div>{I18n("Discount")}:</div>
                    <Price
                      fontSize='1.6rem'
                      color='#91c400'
                      price={cartView.totalDiscount.centAmount}
                    />
                  </Fragment>
                )}
            </PriceWrapper>
            <HR css={{ borderTop: "0.01rem solid #bfbfbf" }} />
            <TotalPriceWrapper>
              <div className='total-price--bold'>
                {I18n("Total")}:<span>{I18n("(incl. VAT)")}</span>
              </div>
              {cartView && (
                <Price fontSize='2.2rem' price={cartView.total.centAmount} />
              )}
            </TotalPriceWrapper>
          </Col>
        </Row>
      )}

      {isOnlyInCart && (
        <Row>
          <Col className='d-none d-md-flex' sm='6' md='6' lg='6'>
            <Link to={pathForContinueShopping || "/"} title=''>
              <TextDropdown
                text={I18n("Continue shopping", true)}
                isLeftArrow={true}
              />
            </Link>
          </Col>
          <Col sm='12' md={{ size: 5, offset: 1 }} lg={{ size: 4, offset: 2 }}>
            <Link to='/checkout' title=''>
              <Button
                bgColorHover='#ee582a'
                bgColor='#91c400'
                color='#fff'
                css={{ width: "100%", textAlign: "center", cursor: "pointer" }}
              >
                {I18n("NAAR BESTELLEN")}
              </Button>
            </Link>
            <div
              css={{
                marginTop: "3.6rem",
                marginBottom: "1rem",
                textAlign: "center",
                fontSize: "1.6rem"
              }}
            >
              {isUserLogged && (
                <div>
                  <span>{I18n("Met deze aankoop verdien je")}</span>&nbsp;
                  <span css={{ fontFamily: "Century Gothic W01 Bold" }}>
                    {JCPoints} {I18n("puten")}!
                  </span>
                </div>
              )}
              {!isUserLogged && (
                <div>
                  <div>{I18n("World JC FRIEND en spaar")}</div>
                  <div>
                    <span css={{ fontFamily: "Century Gothic W01 Bold" }}>
                      {JCPoints} {I18n("puten")}&nbsp;
                    </span>
                    {I18n("over deze aankoop")}
                  </div>
                </div>
              )}
            </div>
          </Col>
        </Row>
      )}

      {isBasket && (
        <Row>
          <TotalPriceWrapper css={{ width: "100%" }}>
            <Col lg={{ offset: 6, size: 6 }}>
              <div css={{ display: "flex", justifyContent: "space-between" }}>
                <div className='total-price--bold'>{I18n("Total")}</div>
                {cartView && (
                  <Price fontSize='2.2rem' price={cartView.total.centAmount} />
                )}
              </div>
              <Link to='/cart' title=''>
                <Button
                  bgColorHover='#ee582a'
                  bgColor='#91c400'
                  color='#fff'
                  css={{
                    width: "100%",
                    textAlign: "center",
                    marginTop: "2rem"
                  }}
                >
                  {I18n("Afrekenen")}
                </Button>
              </Link>
            </Col>
          </TotalPriceWrapper>
        </Row>
      )}
    </>
  );
};

CartFooter.propTypes = {
  isBasket: PropTypes.bool,
  isCheckout: PropTypes.bool,
  isOnlyInCart: PropTypes.bool,
  cartView: PropTypes.object,
  isUserLogged: PropTypes.bool
};

export default CartFooter;
