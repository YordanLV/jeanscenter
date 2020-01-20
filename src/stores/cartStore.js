import { observable, action, reaction, runInAction } from 'mobx';

import authStore from '../stores/authStore';
import localStorage from '../util/localstorage';
import commercetoolsCreateCart from '../apis/commercetools-create-cart';
import assignCart from '../apis/account-assign-cart';
import commercetoolsGetCartView from '../apis/commercetools-cart-view';
import commercetoolsAddProduct from '../apis/commercetools-add-product';
import commercetoolsDeleteProduct from '../apis/commercetools-delete-product';
import commercetoolsAddBillingAddress from '../apis/commercetools-billing-address';
import commercetoolsAddShippingAddress from '../apis/commercetools-shipping-address';

class CartStore {
  @observable cart = {};
  @observable cartView = {};
  @observable isCartViewLoaded = false;
  @observable versions = [];
  @observable isCtaDisabled = false;
  @observable addProductFetching = false;
  @observable billingAddress = {};
  @observable isCheckoutBillngFormError = false;
  @observable isDeliverAddressError = false;
  @observable isAddedProductModalShown = false;

  /* If cart exsists in localstorage fetch it and set it to the store */
  constructor () {
    reaction(
      async () => {
        if (localStorage.getItem('createdCart')) {
          this.cartView = await localStorage.getItem('createdCart');
          this.isCartViewLoaded = true;
        }
      },
      () => {}
    );
  }

  /* Create cart and store it in the localstorage */
  @action
  async createCart () {
    try {
      this.cart = await commercetoolsCreateCart();
      await this.getCartView(this.cart.body.id);
      runInAction(() => {
        localStorage.setItem('createdCart', this.cartView);
        this.isCartViewLoaded = true;
      });
      this.assignCartToUser(this.cart.body.id);
    } catch (e) {
      console.log(e);
    }
  }

  /* Assign cart to user if signed in */
  @action
  async assignCartToUser (cartId) {
    if (authStore.authState === 'signedIn') {
      await assignCart(cartId);
    }
  }

  /* Assign cart to user when logging in with a cart as annonymous user */
  @action
  async assignCartFromAnnonymousUser () {
    try {
      if (localStorage.getItem('createdCart')) {
        this.cartView = await localStorage.getItem('createdCart');
        await this.assignCartToUser(this.cartView.body.id);
      }
    } catch (e) {
      console.log(e);
    }
  }

  /* Get cart view */
  @action
  async getCartView (cartId) {
    try {
      this.cartView = await commercetoolsGetCartView(cartId);
      runInAction(() => {
        localStorage.setItem('createdCart', this.cartView);
        this.isCartViewLoaded = true;
      });
    } catch (e) {
      console.log(e);
    }
  }

  /* Add product to cart using the product SKU */
  @action
  async addProductToCart (productSku) {
    try {
      /* Disable CTA while executing method */
      this.addProductFetching = true;
      this.isCtaDisabled = true;
      /* If cart don't exsist in the localstorage call createCart */
      if (!localStorage.getItem('createdCart')) {
        await this.createCart();
      }
      this.cartView = await localStorage.getItem('createdCart');
      await commercetoolsAddProduct(this.cartView.body.id, this.cartView.body.version, productSku);
      await this.getCartView(this.cartView.body.id);
      this.addProductFetching = false;
      this.isAddedProductModalShown = true;
    } catch (e) {
      this.addProductFetching = false;
      console.log(e);
    }
    /* Enable CTA after method is executed */
    this.isCtaDisabled = false;
  }

  /* Close modal for added product */
  @action
  async toggleAddedProductModalShown () {
    this.isAddedProductModalShown = false;
  }

  /**
   * Delete product from cart using the productId
   * @param {number} quantity Set to a 100 so it can delete the whole line item of a product when press delete product
   */
  @action
  async deleteCartProduct (productId, quantity = 100) {
    try {
      /* Disable CTA while executing method */
      this.isCtaDisabled = true;
      await commercetoolsDeleteProduct(this.cartView.body.id, this.cartView.body.version, productId, quantity);
      await this.getCartView(this.cartView.body.id);
    } catch (e) {
      console.log(e);
    }
    /* Enable CTA after method is executed */
    this.isCtaDisabled = false;
  }

  /* Add billing information to cart */
  @action
  async addBillingInformation (billingAddress) {
    try {
      /* Disable CTA while executing method */
      this.isCtaDisabled = true;
      this.cartView = await localStorage.getItem('createdCart');
      const response = await commercetoolsAddBillingAddress(this.cartView.body.id, this.cartView.body.version, billingAddress);

      if (response && response.statusCode === 200) {
        await this.getCartView(this.cartView.body.id);
        this.billingAddress = billingAddress;
        runInAction(() => {
          localStorage.setItem('createdCart', this.cartView);
          this.isCartViewLoaded = true;
        });
      } else {
        this.isCheckoutBillngFormError = true;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (e) {
      console.log(e);
    }
    /* Enable CTA after method is executed */
    this.isCtaDisabled = false;
  }

  /* Add shipping information to cart */
  @action
  async addShippingInformation (shippingAddress) {
    try {
      /* Disable CTA while executing method */
      this.isCtaDisabled = true;
      this.cartView = await localStorage.getItem('createdCart');
      const response = await commercetoolsAddShippingAddress(this.cartView.body.id, this.cartView.body.version, shippingAddress);
      if (response && response.statusCode === 200) {
        await this.getCartView(this.cartView.body.id);
      } else {
        this.isDeliverAddressError = true;
      }
    } catch (e) {
      console.log(e);
    }
    /* Enable CTA after method is executed */
    this.isCtaDisabled = false;
  }
}

export default new CartStore();
