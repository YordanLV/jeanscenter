import "babel-polyfill";
import "isomorphic-fetch";
import React from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "emotion-theming";

import "bootstrap/dist/css/bootstrap-reboot.min.css";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import "./bootstrap.overwrite.css";
import "./fonts.css";
import "./animations.css";
import "./global.css";

import Helmet from "../containers/Helmet";
import FixedWrapper from "../components/common/FixedWrapper";
import Header from "../containers/Header";
import Nav from "../containers/NavContent";
import SocialSection from "../containers/SocialSection";
import Footer from "../containers/Footer";

export const theme = {
  color: {
    mainGreen: "#91c400",
    mainGray: "#444a55",
    primaryHover: "#ee582a",
    shuttleGray: "#5C616B",
    silverGray: "#bfbfbf",
    taraBlue: "#074054",
    monzaRed: "#E30613"
  },
  zIndex: {
    fixed: 7,
    headerWrapper: 2,
    navWrapper: 7,
    snackbar: 3,
    dropDownBox: 4,
    modal: 9,
    logoLoader: 10,
    brandLogo: 2
  },
  media: {
    xl: "screen and (max-width: 1199px)",
    lg: "screen and (max-width: 991px)",
    md: "screen and (max-width: 767px)",
    sm: "screen and (max-width: 575px)",
    xs: "screen and (max-width: 0px)"
  }
};

const LocaleContext = React.createContext();
export { LocaleContext };

const Layout = ({
  children,
  isHeaderVisible = true,
  isNavWrapperVisible = true,
  isNavVisible = true,
  isSocialSectionVisible = true,
  isFooterVisible = true,
  pageContext
}) => (
  <LocaleContext.Provider value={pageContext}>
    <ThemeProvider theme={theme}>
      <Helmet />
      {(isHeaderVisible || isNavWrapperVisible) && (
        <FixedWrapper>
          {isHeaderVisible && <Header />}
          {isNavWrapperVisible && <Nav isNavVisible={isNavVisible} />}
        </FixedWrapper>
      )}
      {children}
      {isSocialSectionVisible && <SocialSection />}
      {isFooterVisible && <Footer />}
    </ThemeProvider>
  </LocaleContext.Provider>
);

Layout.propTypes = {
  children: PropTypes.array,
  isHeaderVisible: PropTypes.bool,
  isNavWrapperVisible: PropTypes.bool,
  isNavVisible: PropTypes.bool,
  isSocialSectionVisible: PropTypes.bool,
  isFooterVisible: PropTypes.bool,
  pageContext: PropTypes.object
};

export default Layout;
