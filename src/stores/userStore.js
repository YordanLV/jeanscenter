import { observable, action } from 'mobx';

import localStorage from '../util/localstorage';
import getUserData from '../apis/account-get-data';
import getAssignCart from '../apis/account-get-assign-cart';
import checkUser from '../apis/account-check-user';
import createUser from '../apis/account-create-user';
import changePassword from '../apis/account-change-password';
import updateUser from '../apis/account-update-user';
import getUserAddresses from '../apis/account-get-addresses';
import accountUpdateUserAddress from '../apis/account-update-user-address';
import accountForgotPassword from '../apis/account-forgot-password';
import accountConfirmForgotPassword from '../apis/account-confirm-forgot-password';
import changeEmailAddress from '../apis/account-change-email';

class UserStore {
  @observable isLoading = false;
  @observable unregisteredEmail = '';
  @observable userData = {};
  @observable userAddress = {};
  @observable userCartId = '';
  @observable isResetPasswordEmailSent = false;
  @observable isRegistrationError = false;
  @observable isChangePasswordError = false;
  @observable isChangePasswordSuccess = false;
  @observable isChangeEmaildError = false;
  @observable isChangeEmailSuccess = false;
  @observable isUpdateProfileError = false;
  @observable isUpdateProfileSuccess = false;

  /* Get assigned cart for the userId */
  @action
  async getAssignedCart (userId) {
    try {
      const cart = await getAssignCart(userId);
      return cart;
    } catch (e) {
      console.log(e);
    }
  }

  /* Unassign cart by removing createdCart from localStorage */
  @action
  unassignCart () {
    localStorage.removeItem('createdCart');
  }

  /* Get the user data and store it in userData observable */
  @action
  async getUserData () {
    try {
      const userData = await getUserData();
      this.userData = userData.body;
      const userCart = await this.getAssignedCart(userData.body.ctp_id);
      if (userCart) {
        this.userCartId = userCart.body.id;
      }
    } catch (e) {
      console.log(e);
    }
  }

  /* Check if user email exsists in the system */
  @action
  async checkIfUserExists (email) {
    this.isLoading = true;
    try {
      const userExist = await checkUser(email);
      this.isLoading = false;
      return userExist.body.available;
    } catch (e) {
      console.log(e);
    }
    this.isLoading = false;
  }

  /**
   * Create new user using the filled out user information
   * @param {object} userInfo collected user information from a form
   * */
  @action
  async createNewUser (userInfo, isCheckoutRegistration) {
    this.isLoading = true;
    try {
      const response = await createUser(userInfo, isCheckoutRegistration);
      if (response && response.statusCode === 200) {
        this.isRegistrationError = false;
      } else {
        this.isRegistrationError = true;
      }
    } catch (e) {
      console.log(e);
    }
    this.isLoading = false;
  }

  @action
  async changePassword (previousPassword, newPassword) {
    try {
      const response = await changePassword(previousPassword, newPassword);
      if (response === undefined) {
        this.isChangePasswordError = true;
        this.isChangePasswordSuccess = false;
      } else {
        this.isChangePasswordError = false;
        this.isChangePasswordSuccess = true;
      }
    } catch (e) {
      console.log(e);
    }
  }

  @action
  async updateUser (sex, name, middleName, lastName) {
    try {
      const response = await updateUser(sex, name, middleName, lastName);
      if (response && response.statusCode === 200) {
        this.isUpdateProfileError = false;
        this.isUpdateProfileSuccess = true;
      } else {
        this.isUpdateProfileError = true;
        this.isUpdateProfileSuccess = false;
      }

      await this.getUserData();
    } catch (e) {
      console.log(e);
    }
  }

  @action
  async getUserAddresses () {
    try {
      const userAddresses = await getUserAddresses();
      this.userAddress = userAddresses.body[0];
    } catch (e) {
      console.log(e);
    }
  }

  @action
  async accountUpdateUserAddress (userAddress, userUid) {
    try {
      await accountUpdateUserAddress(userAddress, userUid);
      await this.getUserData();
      await this.getUserAddresses();
    } catch (e) {
      console.log(e);
    }
  }

  @action
  async sendEmailForForgotPassword (email) {
    try {
      const response = await accountForgotPassword(email);
      if (response.statusCode === 200) {
        this.isResetPasswordEmailSent = true;
      }
    } catch (e) {
      console.log(e);
    }
  }

  @action
  async accountConfirmForgotPassword (email, confirmationCode, password) {
    try {
      const result = await accountConfirmForgotPassword(email, confirmationCode, password);
      return result;
    } catch (e) {
      console.log(e);
    }
  }

  @action
  clearRegistrationError () {
    this.isRegistrationError = false;
  }

  @action
  async changeEmailAddress (email, password) {
    try {
      const result = await changeEmailAddress(email, password);
      if (result && result.statusCode === 200) {
        this.isChangeEmaildError = false;
        this.isChangeEmailSuccess = true;
        this.getUserData();
      } else {
        this.isChangeEmaildError = true;
        this.isChangeEmailSuccess = false;
      }
    } catch (e) {
      console.log(e);
    }
  }

  @action
  removeMyAccountAlerts () {
    this.isChangeEmaildError = false;
    this.isChangeEmailSuccess = false;
    this.isChangePasswordError = false;
    this.isChangePasswordSuccess = false;
    this.isUpdateProfileError = false;
    this.isUpdateProfileSuccess = false;
  }
}

export default new UserStore();
