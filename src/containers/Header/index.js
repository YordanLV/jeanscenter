import React, { Component } from "react";
import PropTypes from "prop-types";
import { uid } from "react-uid";
import { inject, observer } from "mobx-react";
import { Container, Row, Col } from "reactstrap";

import Link from "../../components/Link";
import HeaderWrapper from "./HeaderWrapper";
import HeaderLinks from "./HeaderLinks";
import HeaderButton from "./HeaderButton";
import CartContent from "../CartContent";
import DropDownBox from "../../components/DropDownBox";
import Logo from "../../components/common/Logo";
import ContentLoader from "../../components/common/ContentLoader";
import { I18n } from "../../i18n";

@inject("layoutStore", "navStore", "cartStore")
@observer
class Header extends Component {
  state = {
    isBasketShown: false
  };

  componentDidMount() {
    this.props.layoutStore.fetchCmsData("nl-be");
  }

  toggleMobileMenu = () => {
    this.props.navStore.toggleMobileActive();
  };

  onMouseEnterBasket = () => {
    this.setState({ isBasketShown: true });
  };

  onMouseLeaveBasket = () => {
    this.setState({ isBasketShown: false });
  };

  render() {
    const cmsLoaded = this.props.layoutStore.cmsLoaded;
    const cmsData = this.props.layoutStore.cmsHeaderData;
    const cartView = this.props.cartStore.cartView.body;
    return (
      <>
        <HeaderWrapper>
          <Container>
            <Row>
              <Col xs='3' md='3' lg='8'>
                {cmsLoaded ? (
                  <HeaderLinks>
                    {cmsData[0].items.map(item => (
                      <Link to={item.link.url} key={uid(item)}>
                        {item.label[0].text}
                      </Link>
                    ))}
                  </HeaderLinks>
                ) : (
                  <ContentLoader width='100%' height='100%' />
                )}
                <HeaderButton
                  className='d-lg-none'
                  iconHex='e909'
                  bgColor={props => props.theme.color.mainGray}
                  onClick={this.toggleMobileMenu}
                >
                  <i />
                  <span>{I18n("Menu")}</span>
                </HeaderButton>
              </Col>
              <Col xs='6' md='6' className='d-lg-none'>
                <Logo
                  // eslint-disable-next-line max-len
                  src='https://res.cloudinary.com/jeanscentre/image/fetch/f_auto,q_auto:good/https://jeanscentre-static.joggroup.net/sys-master/images/h7c/h9b/8796166258718/jcc_logo.png'
                  alt='Logo'
                />
              </Col>
              <Col xs='3' md='3' lg='4'>
                <Link to='/cart' onMouseEnter={this.onMouseEnterBasket}>
                  <HeaderButton
                    iconHex='e900'
                    bgColor={props => props.theme.color.mainGreen}
                  >
                    <i className='basket-icon' />
                    <span className='basket-total'>
                      {(cartView &&
                        (cartView.total
                          ? cartView.total.centAmount / 100
                          : "0.-")) ||
                        "0.-"}
                    </span>
                    <div className='basket-items'>
                      {(cartView && (cartView.totalQuantityOfItems || 0)) || 0}
                    </div>
                  </HeaderButton>
                </Link>
                {this.state.isBasketShown && (
                  <div onMouseLeave={this.onMouseLeaveBasket}>
                    <DropDownBox>
                      <CartContent isBasket={true} />
                    </DropDownBox>
                  </div>
                )}
                <Link to='/login'>
                  <HeaderButton
                    className='d-lg-inline d-none'
                    iconHex='e901'
                    bgColor={props => props.theme.color.taraBlue}
                  >
                    <i />
                    <span>{I18n("Main Account")}</span>
                  </HeaderButton>
                </Link>
              </Col>
            </Row>
          </Container>
        </HeaderWrapper>
      </>
    );
  }
}

Header.propTypes = {
  layoutStore: PropTypes.shape({
    fetchCmsData: PropTypes.func,
    cmsLoaded: PropTypes.bool,
    cmsHeaderData: PropTypes.shape({})
  }),
  navStore: PropTypes.shape({
    toggleMobileActive: PropTypes.func
  }),
  cartStore: PropTypes.shape({
    cartView: PropTypes.object
  })
};

export default Header;
