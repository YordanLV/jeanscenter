import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "reactstrap";
import { uid } from "react-uid";

import AddToCart from "../../components/AddToCart";
import AddedProductModal from "../../components/AddedProductModal";
import ErrorBoundary from "../../components/ErrorBoundary";
import H1 from "../../components/common/H1";
import H6 from "../../components/common/H6";
import WhiteBox from "../../components/common/WhiteBox";
import AttributeBox from "../../components/common/AttributeBox";
import AttributeBoxLoader from "../../components/common/AttributeBox/AttributeBoxLoader";
import Carousel from "../../components/Carousel";
import SizeSelector from "../../components/SizeSelector";
import SizeSelectorLoader from "../../components/SizeSelector/SizeSelectorLoader";
import Price from "../../components/Price";
import CmsRow from "../../cms-components/CmsRow";
import DescriptionBox from "../../components/common/DescriptionBox";
import Modal from "../../components/Modal";
import PromotionalImage from "../../components/PromotionalImage";
import LogoLoader from "../../components/common/LogoLoader";
import { mapAttributesFromCTP } from "../../util/helperFunctions";
import { I18n } from "../../i18n";

@inject("pdpStore", "cartStore", "listerStore")
@observer
class PdpContent extends Component {
  state = { sku: "", isSizesModalShown: false };

  async componentDidMount() {
    await this.props.pdpStore.fetchPdpData(this.props.id);
    this.props.pdpStore.fetchBrandLogo();
    const promotionalTagsArray = await this.props.listerStore.fetchPromotionalTagsFromPrismic();
    await this.props.pdpStore.fetchPromotionalTags(
      promotionalTagsArray,
      this.props.locale.preferredLanguage
    );
  }

  getSku = sku => {
    this.setState({ sku });
  };

  toggleSizeModal = () => {
    this.setState({ isSizesModalShown: !this.state.isSizesModalShown });
  };

  render() {
    const { cmsData, pdpStore, id, cartStore } = this.props;
    const { sku, isSizesModalShown } = this.state;
    const pdpDataFromGatsbyContext = this.props.pdpData.masterData.current;
    const { isAddedProductModalShown, addProductFetching } = cartStore;
    const {
      isPdpLoaded,
      pdpPromoTagObject,
      pdpBrandObject,
      pdpData
    } = pdpStore;
    // We want to use only images with label that includes 2000(thay are higher quality)
    const pdpImages = pdpDataFromGatsbyContext.masterVariant.images.length
      ? pdpDataFromGatsbyContext.masterVariant.images.filter(val =>
          val.label.includes("2000")
        )
      : [];
    const promotionalImageExists = Object.keys(pdpPromoTagObject).length > 0;
    let mappedAttributes = [];
    if (pdpData.attributes && pdpData.attributes.length > 0) {
      mappedAttributes = mapAttributesFromCTP(pdpData.attributes);
    }

    if (pdpDataFromGatsbyContext) {
      return (
        <ErrorBoundary>
          <Container>
            {addProductFetching && <LogoLoader />}
            <Row>
              <Col className='visibleBelow770' css={{ padding: 0 }}>
                <WhiteBox>
                  <Row>
                    <Col
                      sm={promotionalImageExists ? "10" : "12"}
                      xs={promotionalImageExists ? "10" : "12"}
                    >
                      <H1 fontSize='2.2rem'>{pdpDataFromGatsbyContext.name}</H1>
                      {pdpDataFromGatsbyContext.slug ? (
                        <H6>{pdpDataFromGatsbyContext.slug}</H6>
                      ) : null}
                    </Col>
                    {promotionalImageExists ? (
                      <Col sm='2' xs='2'>
                        <PromotionalImage
                          alt={pdpPromoTagObject.alt}
                          src={pdpPromoTagObject.url}
                        />
                      </Col>
                    ) : null}
                  </Row>
                </WhiteBox>
              </Col>
              <Col sm='12' lg='5'>
                {pdpImages.length > 0 ? (
                  <Carousel
                    brandLogo={pdpBrandObject}
                    thumbnails={pdpImages}
                    largeImgs={pdpImages}
                  />
                ) : (
                  I18n("There are no images for this product")
                )}
              </Col>
              <Col sm='12' lg='7'>
                <WhiteBox>
                  <Row className='hiddenBelow770'>
                    <Col sm={promotionalImageExists ? "10" : "12"}>
                      <H1>{pdpDataFromGatsbyContext.name}</H1>
                      {pdpDataFromGatsbyContext.slug ? (
                        <H6>{pdpDataFromGatsbyContext.slug}</H6>
                      ) : null}
                    </Col>
                    {promotionalImageExists ? (
                      <Col sm='2'>
                        <PromotionalImage
                          alt={pdpPromoTagObject.alt}
                          src={pdpPromoTagObject.url}
                        />
                      </Col>
                    ) : null}
                  </Row>
                  <Row>
                    <Col sm='12' xs='12'>
                      {isPdpLoaded ? (
                        <Row css={{ display: "flex", alignItems: "center" }}>
                          <Col xs='12' lg='12'>
                            <SizeSelector
                              sizesModalTrigger={this.toggleSizeModal}
                              sizes={pdpData.sizes}
                              getSku={this.getSku}
                            />
                          </Col>
                          {isSizesModalShown && (
                            <Modal
                              hideModal={this.toggleSizeModal}
                              headerTitle={I18n("Measure Modal Header", true)}
                            >
                              {I18n("Measure Modal Description")}
                            </Modal>
                          )}
                        </Row>
                      ) : (
                        <SizeSelectorLoader />
                      )}
                    </Col>
                  </Row>
                  <Row css={{ alignItems: "center" }}>
                    <Col sm='12' md='6' lg='4'>
                      {isPdpLoaded && (
                        <Price price={pdpData.prices[0].centAmount} />
                      )}
                    </Col>
                    <Col sm='12' md='6' lg='6' xs='12'>
                      <AddToCart
                        isEnabled={sku}
                        productId={id}
                        productSku={sku}
                      />
                    </Col>
                  </Row>
                  {isAddedProductModalShown ? (
                    <AddedProductModal productSku={sku} />
                  ) : null}
                  <Row>
                    <Col sm='12'>
                      {pdpDataFromGatsbyContext.description && (
                        // dangerouslySetInnerHTML prop is set because from ctp is coming string with html inside
                        <DescriptionBox
                          dangerouslySetInnerHTML={{
                            __html: pdpDataFromGatsbyContext.description
                          }}
                        />
                      )}
                      {mappedAttributes.length > 0 ? (
                        <AttributeBox>
                          {mappedAttributes.map(attribute => {
                            return (
                              <Row key={uid(attribute)}>
                                <Col xs='6'>
                                  <strong>{attribute.name}</strong>
                                </Col>
                                <Col xs='6'>{attribute.value}</Col>
                              </Row>
                            );
                          })}
                        </AttributeBox>
                      ) : (
                        <AttributeBoxLoader />
                      )}
                      <div css={{ padding: "3.2rem 0 2rem" }}>
                        <Row>
                          {cmsData.body.map(row => (
                            <Col md='12' key={uid(row)}>
                              <CmsRow type={row.type} data={row} />
                            </Col>
                          ))}
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </WhiteBox>
              </Col>
            </Row>
          </Container>
        </ErrorBoundary>
      );
    } else {
      return <div>{I18n("PDP Missing data")}</div>;
    }
  }
}

PdpContent.propTypes = {
  productName: PropTypes.string,
  locale: PropTypes.object,
  pdpData: PropTypes.object,
  cmsData: PropTypes.object,
  isModalShown: PropTypes.bool,
  id: PropTypes.string,
  pdpStore: PropTypes.shape({
    fetchPdpData: PropTypes.func,
    isPdpLoaded: PropTypes.bool,
    fetchBrandLogo: PropTypes.func,
    fetchPromotionalTags: PropTypes.func,
    pdpBrands: PropTypes.array,
    pdpBrandObject: PropTypes.object,
    pdpData: PropTypes.object,
    pdpPromoTagObject: PropTypes.object
  }),
  cartStore: PropTypes.shape({
    isAddedProductModalShown: PropTypes.bool,
    addProductFetching: PropTypes.bool
  }),
  listerStore: PropTypes.shape({
    fetchPromotionalTagsFromPrismic: PropTypes.func
  })
};

export default PdpContent;
