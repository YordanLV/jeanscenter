import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { Container, Row, Col } from "reactstrap";
import _ from "lodash";

import FacetsRender from "./FacetsRender";
import ContentRender from "./ContentRender";
import Pagination from "./Pagination";
import ErrorBoundry from "../../components/ErrorBoundary";
import H2 from "../../components/common/H2";
import localStorage from "../../util/localstorage";

@inject("listerStore")
@observer
class CategoryContent extends Component {
  state = {
    searchTerm: "",
    tileHeight: null
  };
  async componentDidMount() {
    /* Check and fetch promotions */
    await this.props.listerStore.fetchPromotionalTagsFromPrismic();
    const parsedUrl = new URL(window.location.href);
    /* Set last visited listerpage in localstorage for back functionality */
    localStorage.setItem("lastVisitedListerPage", parsedUrl.pathname);
    /* Grab the parsed url and find the repected lister page */
    if (parsedUrl.search) {
      await this.props.listerStore.tweakwiseSearch(
        parsedUrl.search.slice(1),
        true
      );
    } else {
      await this.props.listerStore.tweakwiseSearch(
        `tn_cid=1000${this.props.listerData.key}`,
        true
      );
    }
    /* Equlizer for tile height */
    this.setTileHeight();
    window.addEventListener("resize", this.setTileHeight.bind(this));
    // eslint-disable-next-line no-undef
    window.dispatchEvent(new Event("resize"));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.setTileHeight.bind(this));
    this.props.listerStore.cleanTweakwiseSeachData();
  }

  /* On load and resize set tile height with 100ms timeout for less glitchy resize expirience */
  setTileHeight = () => {
    const tiles = document.querySelectorAll(".lister-tile");
    let tilesHeight = [];
    /* Set tile height to native height before getting the max height */
    this.setState({ tileHeight: null });
    tiles.forEach(tile => {
      tilesHeight = [...tilesHeight, tile.offsetHeight];
    });
    this.setState({ tileHeight: _.max(tilesHeight) });
  };

  changeTweakwiseSearchTerm = async searchTerm => {
    const normalizedSearchTerm = searchTerm.replace(/^[?]/, "");
    this.createSearchTerm(normalizedSearchTerm);
    await this.props.listerStore.tweakwiseSearch(normalizedSearchTerm);
    this.setTileHeight();
    // eslint-disable-next-line no-undef
    window.dispatchEvent(new Event("resize"));
  };

  handleChange = async event => {
    /* Remove '?' if it first letter of the query */
    const searchTerm = event.target.getAttribute("data-tweakwise");
    await this.changeTweakwiseSearchTerm(searchTerm);
  };

  createSearchTerm = searchTerm => {
    // eslint-disable-next-line no-undef
    if (history.pushState) {
      const newUrl =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname +
        `?${searchTerm}`;
      window.history.pushState({ path: newUrl }, "", newUrl);
    }
  };

  render() {
    const { listerData, listerStore, prismicData } = this.props;
    return (
      <ErrorBoundry>
        <Container>
          <Row>
            <Col lg='2' css={{ marginBottom: "2rem" }}>
              <div>
                <FacetsRender
                  categoryNav={
                    prismicData.node && prismicData.node.category_nav
                  }
                  listerStore={listerStore}
                  listerDataName={listerData.name}
                  pageurl={listerStore}
                  setTileHeight={this.setTileHeight}
                  changeTweakwiseSearchTerm={this.changeTweakwiseSearchTerm}
                  handleChange={this.handleChange}
                />
              </div>
            </Col>
            <Col lg='10'>
              <H2
                css={{
                  fontSize: "2.2rem",
                  paddingBottom: "1rem",
                  fontFamily: "Century Gothic W01",
                  textTransform: "uppercase",
                  lineHeight: "2.3rem",
                  "@media (max-width: 992px)": { display: "none" }
                }}
              >
                {listerData.name}
              </H2>
              <ContentRender
                prismicData={prismicData}
                listerStore={listerStore}
                tileHeight={this.state.tileHeight}
              />
              {prismicData.node &&
                !prismicData.node.category_nav &&
                listerStore.tweakwiseSearchData.properties &&
                Number(listerStore.tweakwiseSearchData.properties.nrofpages) >
                  0 && (
                  <Pagination
                    properties={listerStore.tweakwiseSearchData.properties}
                    handleChange={this.handleChange}
                  />
                )}
            </Col>
          </Row>
        </Container>
      </ErrorBoundry>
    );
  }
}

CategoryContent.propTypes = {
  listerStore: PropTypes.object,
  prismicData: PropTypes.object,
  listerData: PropTypes.shape({
    name: PropTypes.string,
    key: PropTypes.string
  })
};

export default CategoryContent;
