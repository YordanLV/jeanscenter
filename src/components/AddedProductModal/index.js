import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { I18n } from "../../i18n";
import { Container, Row, Col } from "reactstrap";
import styled from "@emotion/styled";

import Modal from "../Modal";
import ArrowText from "../common/ArrowText";
import Price from "../Price";
import H6 from "../common/H6";
import Link from "../Link";
import ArrowButton from "../common/ArrowButton";

const CartItemWrapper = styled.div`
  width: 100%;
  padding: 1.5rem 0 1.5rem 0;
  border-bottom: 0.01rem solid
    ${props => props.theme.color.silverGray || "gray"};
  a {
    text-decoration: none;
  }
`;

const ConfirmedProductActions = styled.div`
  width: 100%;
  padding: 1rem 0 1rem 0;
  .go-to-cart-btn {
    display: flex;
    width: 100%;
    justify-content: flex-end;
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

const ItemInfo = styled.div`
  align-self: center;
  @media ${props => props.theme.media.lg} {
    margin-bottom: 1rem;
    padding-left: 0.8rem;
    width: 100%;
  }
  .info-title {
    h6 {
      font-size: 1.6rem;
      margin: 0;
      @media ${props => props.theme.media.lg} {
        width: 100%;
        font-size: 1.6rem;
      }
    }
    h6:hover {
      color: ${props => props.theme.color.primaryHover};
    }
  }
  .info-promotion-description {
    color: ${props => props.theme.color.primaryHover};
    font-family: CenturyGothicW01-Italic, sans-serif;
    font-size: 1.6rem;
  }
`;

const PropertiesWrapper = styled.div`
  margin-left: -8px;
  margin-right: -8px;
  width: 100%;
  .property-item {
    font-family: "Century Gothic W01", sans-serif;
    font-size: 1.6rem;
    @media ${props => props.theme.media.lg} {
      padding-top: 1rem;
      padding-bottom: 1rem;
      font-size: 1.6rem;
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

@inject("cartStore")
@observer
class AddedProductModal extends Component {
  toggleAddedProductModalShown = () => {
    this.props.cartStore.toggleAddedProductModalShown();
  };

  returnCurrentProductFromCart = items => {
    const { productSku } = this.props;
    const currentItems = items.filter(item => item.sku === productSku);
    if (currentItems.length > 0) {
      return currentItems[0];
    } else {
      return {};
    }
  };

  render() {
    const { isCartViewLoaded, cartView } = this.props.cartStore;
    const cartViewBody = cartView.body;
    const currentItem = this.returnCurrentProductFromCart(
      cartViewBody.lineItems
    );
    return (
      <Modal
        hideModal={this.toggleAddedProductModalShown}
        height="auto"
        headerTitle={I18n("Added to cart", true)}
        width="30%"
      >
        <Container>
          <Row css={{ borderBottom: "0.01rem solid #bfbfbf" }}>
            <ArrowText
              text={I18n("Continue shopping", true)}
              toggleVisibility={this.toggleAddedProductModalShown}
              marginBot="2rem"
            />
          </Row>
          {isCartViewLoaded &&
          cartViewBody.lineItems.length > 0 &&
          Object.keys(currentItem).length > 0 ? (
            <Row>
              <CartItemWrapper>
                <Row>
                  <Col xs="4" lg="2" css={{ alignSelf: "center" }}>
                    <CartItemLeft>
                      <Link to="#" title="" className="product-image">
                        <img src={currentItem.image} alt="" />
                      </Link>
                    </CartItemLeft>
                  </Col>
                  <Col xs="4" lg="6" css={{ alignSelf: "center" }}>
                    <Row noGutters>
                      <ItemInfo isBasket={true}>
                        <Link to="#" title="" className="info-title">
                          <H6>{currentItem.name.en}</H6>
                        </Link>
                        {currentItem.promotionDescription && (
                          <div className="info-promotion-description">
                            {currentItem.promotionDescription["nl-BE"]}
                          </div>
                        )}
                      </ItemInfo>
                    </Row>
                    <Row>
                      <PropertiesWrapper isBasket={true}>
                        <Row>
                          {currentItem.length && (
                            <Col>
                              <div className="property-item">
                                <span>{I18n("LENGTH")}</span>
                                {currentItem.length}
                              </div>
                            </Col>
                          )}
                          <Col>
                            <div className="property-item">
                              <span>
                                {currentItem.length
                                  ? I18n("SIZE")
                                  : I18n("MAAT")}
                              </span>
                              {currentItem.size}
                            </div>
                          </Col>
                        </Row>
                      </PropertiesWrapper>
                    </Row>
                  </Col>
                  <Col xs="4" lg="4" css={{ alignSelf: "center" }}>
                    <PricesWrapper isBasket={true}>
                      {currentItem.prices.discountPrice ? (
                        <>
                          <Price
                            fontSize="1.2rem"
                            isOldPrice={true}
                            price={
                              currentItem.prices.firstPriceInTheCart.centAmount
                            }
                          />
                          <Price
                            color="#ff0000"
                            fontSize="1.8rem"
                            marginLeft="0.5rem"
                            price={currentItem.prices.discountPrice.centAmount}
                          />
                        </>
                      ) : (
                        <Price
                          fontSize="1.6em"
                          price={
                            currentItem.prices.firstPriceInTheCart.centAmount
                          }
                        />
                      )}
                    </PricesWrapper>
                  </Col>
                </Row>
              </CartItemWrapper>
              <ConfirmedProductActions>
                <Link to="/cart" className="go-to-cart-btn">
                  <ArrowButton
                    bgColorHover="#ee582a"
                    onClickFunction={this.toggleAddedProductModalShown}
                    bgColor="#91c400"
                    color="#fff"
                    css={{ width: "55%", textAlign: "center" }}
                  >
                    {I18n("NAAR BESTELLEN")}
                  </ArrowButton>
                </Link>
              </ConfirmedProductActions>
            </Row>
          ) : null}
        </Container>
      </Modal>
    );
  }
}

AddedProductModal.propTypes = {
  productSku: PropTypes.string,
  pdpImage: PropTypes.string,
  onClickFunction: PropTypes.func,
  cartStore: PropTypes.shape({
    toggleAddedProductModalShown: PropTypes.func,
    isCartViewLoaded: PropTypes.bool,
    cartView: PropTypes.object
  }),
  theme: PropTypes.shape({
    color: PropTypes.object
  })
};

export default AddedProductModal;
