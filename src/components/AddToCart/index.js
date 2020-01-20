import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

import Button from "../../components/common/Button";
import { I18n } from "../../i18n";

const AddToCartButtonWrapper = styled.div`
  .addToCartButton {
    &:hover {
      .button-icon {
        left: 0.5rem;
      }
    }
  }
`;

const SpanWithIconInFront = styled.span`
  position: relative;
  width: 100%;
  white-space: nowrap;
  padding: 0rem 2rem;
  .button-icon {
    position: absolute;
    left: 0;
    transition: 0.3s;
    &:before {
      content:  "\\${props => (props.isLeftArrow ? "e908" : "e903")}";
      margin-right: 1rem;
      font-family: icomoon-jc!important;
      font-size: 1.6rem;
      font-weight: bold;
    }
    &:hover {
      &:before {
        margin-right: 0.3rem;
      }
    }
  }
`;

@inject("cartStore")
@observer
class AddToCart extends Component {
  state = {
    isSizesModalShown: false
  };

  addProductToCart = () => {
    this.props.cartStore.addProductToCart(this.props.productSku);
  };

  render() {
    const { isCtaDisabled } = this.props.cartStore;
    return (
      <>
        <AddToCartButtonWrapper>
          <Button
            className='addToCartButton'
            color='#fff'
            withArrow={true}
            css={{
              textAlign: "center",
              "@media (max-width: 770px)": { width: "100%" },
              position: "relative"
            }}
            bgColor={props => props.theme.color.primaryHover}
            bgColorHover={props => props.theme.color.mainGreen}
            disabled={isCtaDisabled || !this.props.isEnabled}
            onClick={() => {
              if (!(isCtaDisabled || !this.props.isEnabled)) {
                this.addProductToCart();
              }
            }}
          >
            <SpanWithIconInFront>
              <span className='button-icon' />
              {I18n("Add To Cart")}
            </SpanWithIconInFront>
          </Button>
        </AddToCartButtonWrapper>
      </>
    );
  }
}

AddToCart.propTypes = {
  productSku: PropTypes.string,
  isEnabled: PropTypes.any,
  cartStore: PropTypes.shape({
    addProductToCart: PropTypes.func,
    isCtaDisabled: PropTypes.bool
  })
};

export default AddToCart;
