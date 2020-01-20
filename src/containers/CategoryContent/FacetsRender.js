import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { inject, observer } from "mobx-react";

import FacetsCategories from "./FacetsCategories";
import FacetsListers from "./FacetsListers";
import {
  FacetFilterButtonMobile,
  FacetMobileMenuHeader,
  HideOnMobile
} from "./FacetStyles";
import Modal from "../../components/Modal";

@inject("listerStore")
@observer
class Facets extends React.Component {
  state = {
    searchTerm: "",
    showFilterMobile: false,
    isModalShown: false
  };
  async componentDidMount() {
    const parsedUrl = new URL(window.location.href);
    if (parsedUrl.search) {
      /* Remove '?' if it first letter of the query */
      await this.props.listerStore.tweakwiseSearch(
        parsedUrl.search.replace(/^[?]/, "")
      );
      this.props.setTileHeight();
      // eslint-disable-next-line no-undef
      window.dispatchEvent(new Event("resize"));
    }
  }

  toggleFacetsMobile = () => {
    this.setState({ isModalShown: !this.state.isModalShown });
  };

  slideFacet = event => {
    /* Animation for slide collapsing facet up and down */
    const toggle = event.target.getAttribute("data-slide-toggle");
    /* Using querySelectorAll because of dublicated menu for mobile and desktop */
    const toggleContainer = document.querySelectorAll(
      `ul[data-slide-container="${toggle}"]`
    );
    for (let i = 0; i < toggleContainer.length; i++) {
      toggleContainer[i] && toggleContainer[i].classList.toggle("collapsed");
    }
    event.target && event.target.classList.toggle("collapsed");
  };

  handleExpandtext = event => {
    /* Method for expanding more/less button whenever facets exceed a certain number of attributes */
    const expandtext = event.target.getAttribute("data-expandtext");
    const collapsetext = event.target.getAttribute("data-collapsetext");
    if (event.target.innerHTML === expandtext) {
      event.target.innerHTML = collapsetext;
    } else {
      event.target.innerHTML = expandtext;
    }
    const excessElms = event.target.parentElement.querySelectorAll(
      ".hide-excess"
    );
    for (let i = 0; i < excessElms.length; i++) {
      excessElms[i].classList.toggle("show-excess");
    }
  };

  render() {
    /* Render facets for a category if there is a CMS content */
    const {
      categoryNav,
      listerStore,
      listerDataName,
      changeTweakwiseSearchTerm,
      handleChange
    } = this.props;
    if (categoryNav) {
      return (
        <>
          <FacetMobileMenuHeader>{listerDataName}</FacetMobileMenuHeader>
          <FacetsCategories categoryNav={categoryNav} />
        </>
      );
    }
    /* Render facets for lister otherwise */
    return (
      <>
        <FacetMobileMenuHeader>{listerDataName}</FacetMobileMenuHeader>
        {/* Lister Facets For Desktop */}
        <HideOnMobile>
          <FacetsListers
            tweakwiseSearchData={listerStore.tweakwiseSearchData}
            isCtaDisabled={listerStore.isCtaDisabled}
            slideFacet={this.slideFacet}
            changeTweakwiseSearchTerm={changeTweakwiseSearchTerm}
            handleChange={handleChange}
            showFacetsMobile={this.showFacetsMobile}
            handleExpandtext={this.handleExpandtext}
          />
        </HideOnMobile>
        {/* Lister Facets For Mobile */}
        <div>
          <div css={{ padding: "0.8rem" }}>
            <FacetFilterButtonMobile onClick={this.toggleFacetsMobile}>
              FILTER
            </FacetFilterButtonMobile>
          </div>
          {this.state.isModalShown && (
            <Modal hideModal={this.toggleFacetsMobile}>
              <FacetsListers
                tweakwiseSearchData={listerStore.tweakwiseSearchData}
                isCtaDisabled={listerStore.isCtaDisabled}
                slideFacet={this.slideFacet}
                changeTweakwiseSearchTerm={changeTweakwiseSearchTerm}
                handleChange={handleChange}
                showFacetsMobile={this.showFacetsMobile}
                handleExpandtext={this.handleExpandtext}
              />
            </Modal>
          )}
        </div>
      </>
    );
  }
}

Facets.propTypes = {
  setTileHeight: PropTypes.func,
  categoryNav: PropTypes.object,
  listerDataName: PropTypes.string,
  changeTweakwiseSearchTerm: PropTypes.func,
  handleChange: PropTypes.func,
  listerStore: PropTypes.shape({
    tweakwiseSearch: PropTypes.func,
    isCtaDisabled: PropTypes.bool,
    tweakwiseSearchData: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ])
  })
};

export default Facets;
