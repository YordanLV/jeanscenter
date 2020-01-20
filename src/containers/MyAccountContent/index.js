import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";

import localStorage from "../../util/localstorage";
import { Container, Row, Col } from "reactstrap";
import { Link, Router } from "@reach/router";
import { navigate } from "../../components/Navigate";
import AccountOverview from "./AccountOverview";
import AccountProfile from "./AccountProfile";
import AccountAddress from "./AccountAddress";
import SideNav from "../../components/SideNav";
import UpdateProfile from "./UpdateProfile";
import UpdateEmail from "./UpdateEmail";
import UpdatePassword from "./UpdatePassword";
import AccountChangeAddress from "./AccountChangeAddress";
import { I18n } from "../../i18n";

@inject("authStore", "userStore", "cartStore")
@observer
class MyAccountContent extends Component {
  async componentDidMount() {
    const { userStore, cartStore } = this.props;
    await userStore.getUserData();
    this.props.userStore.getUserAddresses();
    if (userStore.userCartId) {
      await cartStore.getCartView(userStore.userCartId);
    } else {
      await cartStore.assignCartFromAnnonymousUser();
    }

    localStorage.setItem("name", this.props.userStore.userData.name);
  }
  signOut = async () => {
    this.props.userStore.unassignCart();
    await this.props.authStore.signOut();
    window.location.reload(true);
  };

  accountUpdateUserAddress = async (values, uid) => {
    await this.props.userStore.accountUpdateUserAddress(values, uid);
  };

  changePassword = (previousPassword, newPassword) => {
    this.props.userStore.changePassword(previousPassword, newPassword);
  };

  updateUser = (gender, firstName, middleName, lastName) => {
    this.props.userStore.updateUser(gender, firstName, middleName, lastName);
  };

  changeEmailAddress = (email, password) => {
    this.props.userStore.changeEmailAddress(email, password);
  };

  removeMyAccountAlerts = () => {
    this.props.userStore.removeMyAccountAlerts();
  };

  render() {
    if (this.props.authStore.authState !== "signedIn") {
      navigate("/login");
    }
    return (
      <Container css={{ marginBottom: "7rem" }} className='container--fluid-xl'>
        <Row>
          <Col sm='12' lg='3' css={{ marginBottom: "1.6rem" }}>
            <div css={{ padding: "3.5rem 2.5rem", background: "#fff" }}>
              <div
                css={{
                  fontSize: "1.6rem",
                  fontFamily: "Century Gothic W01 Bold"
                }}
              >
                {I18n("MY ACCOUNT")}
              </div>
              <SideNav>
                <Link to='/my-account/'>{I18n("Overview")}</Link>
                <Link to='/my-account/profile'>{I18n("Profile")}</Link>
                <Link to='/my-account/address'>{I18n("Address")}</Link>
                <span onClick={this.signOut}>{I18n("Log out")}</span>
              </SideNav>
            </div>
          </Col>
          <Col sm='12' lg='9'>
            <div css={{ padding: "3.5rem 2.5rem", background: "#fff" }}>
              <Router basepath='/my-account'>
                <AccountOverview
                  path='/'
                  name={this.props.userStore.userData.name}
                />
                {this.props.userStore.userData && (
                  <AccountProfile
                    path='/profile'
                    userData={this.props.userStore.userData}
                  />
                )}
                <UpdateProfile
                  path='/update-profile'
                  userData={this.props.userStore.userData}
                  updateUser={this.updateUser}
                  isUpdateProfileError={
                    this.props.userStore.isUpdateProfileError
                  }
                  isUpdateProfileSuccess={
                    this.props.userStore.isUpdateProfileSuccess
                  }
                  removeMyAccountAlerts={this.removeMyAccountAlerts}
                />
                <UpdateEmail
                  path='/update-email'
                  userData={this.props.userStore.userData}
                  changeEmailAddress={this.changeEmailAddress}
                  isChangeEmaildError={this.props.userStore.isChangeEmaildError}
                  isChangeEmailSuccess={
                    this.props.userStore.isChangeEmailSuccess
                  }
                  removeMyAccountAlerts={this.removeMyAccountAlerts}
                />
                <UpdatePassword
                  path='/update-password'
                  changePassword={this.changePassword}
                  isChangePasswordError={
                    this.props.userStore.isChangePasswordError
                  }
                  isChangePasswordSuccess={
                    this.props.userStore.isChangePasswordSuccess
                  }
                  removeMyAccountAlerts={this.removeMyAccountAlerts}
                />
                <AccountAddress
                  path='/address'
                  userAddress={this.props.userStore.userAddress}
                />
                <AccountChangeAddress
                  path='/edit-address'
                  userAddress={this.props.userStore.userAddress}
                  accountUpdateUserAddress={this.accountUpdateUserAddress}
                />
              </Router>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

MyAccountContent.propTypes = {
  authStore: PropTypes.shape({
    signOut: PropTypes.func,
    authState: PropTypes.string
  }),
  userStore: PropTypes.shape({
    getUserData: PropTypes.func,
    unassignCart: PropTypes.func,
    userData: PropTypes.object,
    changePassword: PropTypes.func,
    updateUser: PropTypes.func,
    getUserAddresses: PropTypes.func,
    userAddress: PropTypes.object,
    accountUpdateUserAddress: PropTypes.func,
    userCartId: PropTypes.string,
    isChangePasswordError: PropTypes.bool,
    isChangePasswordSuccess: PropTypes.bool,
    changeEmailAddress: PropTypes.func,
    isChangeEmaildError: PropTypes.bool,
    isChangeEmailSuccess: PropTypes.bool,
    removeMyAccountAlerts: PropTypes.func,
    isUpdateProfileError: PropTypes.bool,
    isUpdateProfileSuccess: PropTypes.bool
  }),
  cartStore: PropTypes.shape({
    assignCartFromAnnonymousUser: PropTypes.func,
    getCartView: PropTypes.func
  })
};

export default MyAccountContent;
