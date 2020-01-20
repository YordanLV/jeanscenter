import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";

import Button from "../common/Button";
import Modal from "../Modal";
import { I18n } from "../../i18n";

@inject("cartStore")
@observer
class ConfirmAddToCart extends Component {
  state = { isConfirmModalShown: false };

  addProductToCart = () => {
    this.props.cartStore.addProductToCart(this.props.productSku);
  };

  toggleConfirmModal = () => {
    this.setState({ isConfirmModalShown: !this.state.isConfirmModalShown });
  };

  render() {
    const { cartStore } = this.props;
    const { isConfirmModalShown } = this.state;
    const ConfirmAddToCartButton = Button.withComponent("button");
    return (
      <>
        <ConfirmAddToCartButton
          color='#fff'
          bgColor={props => props.theme.color.primaryHover}
          bgColorHover={props => props.theme.color.mainGreen}
          disabled={cartStore.isCtaDisabled || !this.props.isEnabled}
          onClick={this.toggleConfirmModal}
        >
          {I18n("Add To Cart")}
        </ConfirmAddToCartButton>
        {isConfirmModalShown && (
          <Modal
            hideModal={this.toggleConfirmModal}
            headerTitle={I18n("Add To Cart Modal Header", true)}
            width='50%'
          >
            {I18n("Add To Cart Modal Description")}
          </Modal>
        )}
      </>
    );
  }
}

ConfirmAddToCart.propTypes = {
  productSku: PropTypes.string,
  isEnabled: PropTypes.any,
  cartStore: PropTypes.shape({
    addProductToCart: PropTypes.func,
    isCtaDisabled: PropTypes.bool
  })
};

export default ConfirmAddToCart;
