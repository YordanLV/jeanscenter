import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";

import { Container } from "reactstrap";
import CartItem from "../../components/common/CartItem";
import CartHeader from "./CartHeader";
import CartFooter from "./CartFooter";
import EmptyCart from "./EmptyCart";
import H2 from "../../components/common/H2";
import H4 from "../../components/common/H4";
import WhiteBox from "../../components/common/WhiteBox";
import { I18n } from "../../i18n";
import { uid } from "react-uid";

@inject("cartStore", "authStore")
@observer
class CartContent extends Component {
  increaseProductQuantity = productSku => {
    this.props.cartStore.addProductToCart(productSku);
  };

  decreaseProductQuantity = productId => {
    this.props.cartStore.deleteCartProduct(productId, 1);
  };

  deleteCartProduct = productId => {
    this.props.cartStore.deleteCartProduct(productId);
  };

  render() {
    const { isBasket, isCheckout } = this.props;
    const { isCartViewLoaded, isCtaDisabled, cartView } = this.props.cartStore;
    const cartViewBody = cartView.body;
    const isOnlyInCart = !isBasket && !isCheckout;
    const isUserLogged = this.props.authStore.authState === "signedIn";

    if (isCartViewLoaded && cartViewBody.lineItems) {
      return (
        <Container
          className='container--fluid-xl'
          css={{
            marginBottom: isBasket ? 0 : "7rem",
            minWidth: isBasket ? "48rem" : "auto"
          }}
        >
          <WhiteBox
            isCheckout={isCheckout}
            css={{
              padding: isOnlyInCart ? "4rem 5.6rem" : isBasket ? "0 2rem" : 0
            }}
          >
            <CartHeader
              isBasket={isBasket}
              isCheckout={isCheckout}
              isOnlyInCart={isOnlyInCart}
              numberItems={cartViewBody.lineItems.length}
            />

            {cartViewBody.lineItems.map((item, index) => {
              if (isBasket && index > 1) {
                return;
              }
              return (
                <CartItem
                  data={item}
                  key={uid(item)}
                  isBasket={isBasket}
                  isCheckout={isCheckout}
                  isOnlyInCart={isOnlyInCart}
                  isCtaDisabled={isCtaDisabled}
                  deleteCartProduct={this.deleteCartProduct}
                  increaseProductQuantity={this.increaseProductQuantity}
                  decreaseProductQuantity={this.decreaseProductQuantity}
                />
              );
            })}

            <CartFooter
              isBasket={isBasket}
              isCheckout={isCheckout}
              isOnlyInCart={isOnlyInCart}
              cartView={cartViewBody}
              isUserLogged={isUserLogged}
            />
          </WhiteBox>
        </Container>
      );
    } else {
      return (
        <Container
          css={{ marginBottom: "7rem" }}
          className='container--fluid-xl'
        >
          <WhiteBox>
            <EmptyCart>
              <H2>{I18n("YOUR SHOPPING BASKET IS STILL EMPTY")}</H2>
              <H4>{I18n("Go shopping! :-)")}</H4>
            </EmptyCart>
          </WhiteBox>
        </Container>
      );
    }
  }
}

CartContent.propTypes = {
  cartStore: PropTypes.object,
  isBasket: PropTypes.bool,
  isCheckout: PropTypes.bool,
  authStore: PropTypes.shape({
    authState: PropTypes.string
  })
};

export default CartContent;
