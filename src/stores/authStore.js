import { observable, action } from 'mobx';
import { Auth } from 'aws-amplify';

class AuthStore {
  @observable authState = 'signIn';

  /**
   * Set authState
   * @param {string} state set state to signIn or signedIn depending on the user status
   */
  @action
  async setAuthState (state) {
    try {
      this.authState = state;
    } catch (e) {
      console.log(e);
    }
  }

  /* Signing out using the aws-amplify for signout */
  @action
  async signOut () {
    try {
      await Auth.signOut();
    } catch (e) {
      console.log(e);
    }
  }
}

export default new AuthStore();
