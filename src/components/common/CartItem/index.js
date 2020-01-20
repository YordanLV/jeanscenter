import React from "react";
import PropTypes from "prop-types";
import { I18n } from "../../../i18n";
import { Row, Col } from "reactstrap";
import styled from "@emotion/styled";

import InputQuantity from "../../InputQuantity";
import Price from "../../Price";
import DeleteItem from "./DeleteItem";
import HR from "../HR";
import H6 from "../H6";
import Link from "../../Link";

const _ = require("lodash");

const CartItemWrapper = styled.div`
  width: 100%;
  padding: 1rem 0 1rem 0;
  a {
    text-decoration: none;
  }
`;

const CartItemLeft = styled.div`
  display: flex;
  position: relative;
  .product-image {
    width: 100%;
    text-align: center;
    img {
      width: 100%;
      max-width: 15rem;
    }
  }
`;

const StockText = styled.div`
  margin-bottom: 1rem;
  color: ${props => (props.isInStock ? "#a1a4aa" : props.theme.color.monzaRed)};
  font-size: 1.6rem;
`;

const ItemInfo = styled.div`
  align-self: center;
  @media ${props => props.theme.media.lg} {
    margin-bottom: 1rem;
    padding-left: 0.8rem;
    width: 100%;
  }
  .info-title {
    h6 {
      font-size: ${props => (!props.isOnlyInCart ? "1.3rem" : "1.6rem")};
      margin: 0;
      @media ${props => props.theme.media.lg} {
        width: 100%;
        font-size: ${props => (props.isBasket ? "1.3rem" : "1.6rem")};
      }
    }
    h6:hover {
      color: ${props => props.theme.color.primaryHover};
    }
  }
  .info-promotion-description {
    color: #ff0000;
    font-family: CenturyGothicW01-Italic, sans-serif;
  }
`;

const PropertiesWrapper = styled.div`
  .property-item {
    font-family: "Century Gothic W01", sans-serif;
    font-size: ${props => (!props.isOnlyInCart ? "1.3rem" : "1.6rem")};
    @media ${props => props.theme.media.lg} {
      padding-top: 1rem;
      padding-bottom: 1rem;
      font-size: ${props => (props.isBasket ? "1.3rem" : "1.6rem")};
    }
    span {
      display: block;
      color: #a1a4aa;
    }
  }
`;

const PricesWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  @media ${props => props.theme.media.lg} {
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-top: 2rem;
    margin-left: ${props => (props.isBasket ? 0 : "1.4em")};
    width: 100%;
  }
`;

const PriceBasketCheckout = styled.div`
  ${props => (!props.isOnlyInCart ? "width: 100%" : "")};
  ${props => (!props.isOnlyInCart ? "text-align: right" : "")};
`;

const CartItem = ({
  data,
  isBasket,
  isCheckout,
  isOnlyInCart,
  isCtaDisabled,
  deleteCartProduct,
  increaseProductQuantity,
  decreaseProductQuantity
}) => {
  const isInStock = data.availability.isOnStock;
  const linkItem = `/${data.categoryAsUrl}/${_.kebabCase(
    data.name.en
  )}/${_.kebabCase(data.productSlug)}`;
  return (
    <Row>
      <HR css={{ width: "100%", borderTop: "0.01rem solid #bfbfbf" }} />
      <CartItemWrapper>
        <Row>
          <Col xs={isCheckout ? "3" : "4"} lg='2' css={{ alignSelf: "center" }}>
            <CartItemLeft>
              {isOnlyInCart && (
                <DeleteItem onClick={() => deleteCartProduct(data.id)} />
              )}
              <Link to='#' title='' className='product-image'>
                <img src={data.image} alt='' />
              </Link>
            </CartItemLeft>
          </Col>

          {isOnlyInCart && (
            <Col xs='8' lg='10' css={{ display: "flex" }}>
              <Row css={{ alignItems: "center", width: "100%" }}>
                <Col lg='4'>
                  <ItemInfo isOnlyInCart={isOnlyInCart} isBasket={isBasket}>
                    <Link to={linkItem} title='' className='info-title'>
                      <H6>{data.name.en}</H6>
                    </Link>
                    <StockText isInStock={isInStock}>
                      {isInStock ? I18n("IN STOCK") : I18n("OUT OF STOCK")}
                    </StockText>
                    {data.promotionDescription && (
                      <div
                        className='info-promotion-description'
                        css={{ fontSize: "1.6rem" }}
                      >
                        {data.promotionDescription["nl-BE"]}
                      </div>
                    )}
                  </ItemInfo>
                </Col>

                <Col lg='3'>
                  <PropertiesWrapper
                    isOnlyInCart={isOnlyInCart}
                    isBasket={isBasket}
                  >
                    <Row>
                      {data.length && (
                        <Col>
                          <div className='property-item'>
                            <span>{I18n("LENGTH")}</span>
                            {data.length}
                          </div>
                        </Col>
                      )}
                      <Col>
                        <div className='property-item'>
                          <span>
                            {data.length ? I18n("SIZE") : I18n("MAAT")}
                          </span>
                          {data.size}
                        </div>
                      </Col>
                    </Row>
                  </PropertiesWrapper>
                </Col>

                <Col lg='3'>
                  <div css={{ display: "flex", paddingLeft: "0.8rem" }}>
                    <InputQuantity
                      quantity={data.quantity}
                      maxQuantity={data.availability.availableQuantity}
                      isCtaDisabled={isCtaDisabled}
                      increaseQuantity={() => increaseProductQuantity(data.sku)}
                      decreaseQuantity={() => decreaseProductQuantity(data.id)}
                    />
                  </div>
                </Col>

                <Col lg='2'>
                  <PricesWrapper
                    isBasket={isBasket}
                    isOnlyInCart={isOnlyInCart}
                  >
                    <Row
                      css={{
                        width: "100%",
                        justifyContent: "space-between",
                        maxWidth: "15rem",
                        flexWrap: "nowrap"
                      }}
                    >
                      {data.prices.discountPrice && (
                        <div css={{ display: "flex" }}>
                          <PriceBasketCheckout
                            isBasket={isBasket}
                            isCheckout={isCheckout}
                            isOnlyInCart={isOnlyInCart}
                          >
                            <Price
                              color='#a1a9aa'
                              fontSize='1.2rem'
                              isOldPrice={true}
                              price={data.prices.firstPriceInTheCart.centAmount}
                            />
                          </PriceBasketCheckout>
                          <PriceBasketCheckout
                            isBasket={isBasket}
                            isCheckout={isCheckout}
                            isOnlyInCart={isOnlyInCart}
                          >
                            <Price
                              color='#ff0000'
                              fontSize='1.8rem'
                              marginLeft='0.5rem'
                              price={data.prices.discountPrice.centAmount}
                            />
                          </PriceBasketCheckout>
                        </div>
                      )}
                      {!data.prices.discountPrice && (
                        <Price
                          fontSize='1.8rem'
                          price={data.prices.firstPriceInTheCart.centAmount}
                        />
                      )}
                      <Price
                        fontSize='1.8rem'
                        marginLeft='1rem'
                        price={data.prices.totalPrice.centAmount}
                      />
                    </Row>
                  </PricesWrapper>
                </Col>
              </Row>
            </Col>
          )}

          {!isOnlyInCart && (
            <Col xs={isCheckout ? "9" : "8"} lg='10' css={{ display: "flex" }}>
              <Row css={{ alignItems: "center", width: "100%" }}>
                <Col xs='10'>
                  <ItemInfo isOnlyInCart={isOnlyInCart} isBasket={isBasket}>
                    <Link to={linkItem} title='' className='info-title'>
                      <H6>{data.name.en}</H6>
                    </Link>

                    <PropertiesWrapper
                      isOnlyInCart={isOnlyInCart}
                      isBasket={isBasket}
                    >
                      <Row css={{ margin: "0.5rem 0 !important" }}>
                        {data.length && (
                          <Col css={{ paddingLeft: 0, paddingRight: "0.5rem" }}>
                            <div className='property-item'>
                              <span>{I18n("LENGTH")}</span>
                              {data.length}
                            </div>
                          </Col>
                        )}
                        <Col css={{ paddingLeft: 0, paddingRight: "0.3rem" }}>
                          <div className='property-item'>
                            <span>
                              {data.length ? I18n("SIZE") : I18n("MAAT")}
                            </span>
                            {data.size}
                          </div>
                        </Col>
                        <Col css={{ paddingLeft: 0, paddingRight: 0 }}>
                          <div className='property-item'>
                            <span>{I18n("AANTAL")}</span>
                            <div className='property-item'>{data.quantity}</div>
                          </div>
                        </Col>
                      </Row>
                    </PropertiesWrapper>

                    {data.promotionDescription && (
                      <div className='info-promotion-description'>
                        {data.promotionDescription["nl-BE"]}
                      </div>
                    )}
                  </ItemInfo>
                </Col>

                <Col xs='2' css={{ padding: "0 0.3rem 0 0", height: "100%" }}>
                  <PricesWrapper
                    isBasket={isBasket}
                    isOnlyInCart={isOnlyInCart}
                  >
                    <Row
                      css={{
                        alignItems: "top",
                        flexWrap: "wrap",
                        width: "100%"
                      }}
                    >
                      {data.prices.discountPrice && (
                        <>
                          <PriceBasketCheckout
                            isBasket={isBasket}
                            isCheckout={isCheckout}
                            isOnlyInCart={isOnlyInCart}
                          >
                            <Price
                              color='#a1a9aa'
                              fontSize='1.2rem'
                              isOldPrice={true}
                              price={data.prices.firstPriceInTheCart.centAmount}
                              css={{ fontFamily: "Century Gothic W01" }}
                            />
                          </PriceBasketCheckout>
                          <PriceBasketCheckout
                            isBasket={isBasket}
                            isCheckout={isCheckout}
                            isOnlyInCart={isOnlyInCart}
                          >
                            <Price
                              color='#ff0000'
                              fontSize='1.6rem'
                              marginLeft='0.5rem'
                              price={data.prices.discountPrice.centAmount}
                            />
                          </PriceBasketCheckout>
                        </>
                      )}
                      {!data.prices.discountPrice && (
                        <div css={{ width: "100%", textAlign: "right" }}>
                          <Price
                            fontSize='1.6rem'
                            price={data.prices.firstPriceInTheCart.centAmount}
                          />
                        </div>
                      )}
                    </Row>
                  </PricesWrapper>
                </Col>
              </Row>
            </Col>
          )}
        </Row>
      </CartItemWrapper>
    </Row>
  );
};

CartItem.propTypes = {
  data: PropTypes.object,
  isBasket: PropTypes.bool,
  isCheckout: PropTypes.bool,
  isOnlyInCart: PropTypes.bool,
  deleteCartProduct: PropTypes.func,
  increaseProductQuantity: PropTypes.func,
  decreaseProductQuantity: PropTypes.func,
  isCtaDisabled: PropTypes.bool
};

export default CartItem;
