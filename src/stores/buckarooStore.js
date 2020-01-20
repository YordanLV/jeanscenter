import { observable, action } from 'mobx';

import postDataToBuckaroo from '../apis/buckaroo-checkout';

class BuckarooStore {
  @observable isBuckarooCheckoutError = false;
  @observable isLoading = false;

  @action
  async getBuckarooResponse (cartId, paymentMethod) {
    this.isLoading = true;
    try {
      const response = await postDataToBuckaroo(cartId, paymentMethod);
      console.log(response);
      if (response && response.statusCode === 200) {
        this.isBuckarooCheckoutError = false;
        window.location.href = response.body.RedirectUrl;
      } else {
        this.isBuckarooCheckoutError = true;
      }
    } catch (e) {
      console.log(e);
    }
    this.isLoading = false;
  }
}

export default new BuckarooStore();
