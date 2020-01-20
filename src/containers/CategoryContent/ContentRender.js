import React from "react";
import PropTypes from "prop-types";
import { uid } from "react-uid";
import styled from "@emotion/styled";
import { Row, Col } from "reactstrap";

import CmsRow from "../../cms-components/CmsRow";
import ListerTile from "../../components/ListerTile";
import ListerTileLoader from "../../components/ListerTile/ListerTileLoader";
import ArrowButton from "../../components/common/ArrowButton";
import Link from "../../components/Link";
import { I18n } from "../../i18n";

const PrismicParagraphWrapper = styled.div`
  margin-top: 3rem;
  p {
    margin-bottom: 2.2rem;
    font-size: 1.6rem;
  }
`;

const ContentRender = ({ prismicData, listerStore, tileHeight }) => {
  const findPromotionaTag = item => {
    if (listerStore.promotionalTagsArray.length) {
      if (item.attributes.attribute.length > 0) {
        const itemPromotionalArray = item.attributes.attribute.filter(
          val => val.name === "discountName" && val.values
        );
        if (itemPromotionalArray.length > 0) {
          const llisterPromoTagFilteredArray = listerStore.promotionalTagsArray.filter(
            promotion =>
              promotion.promotion_name === itemPromotionalArray[0].values.value
          );
          return llisterPromoTagFilteredArray.length > 0
            ? llisterPromoTagFilteredArray[0]
            : {};
        } else {
          return {};
        }
      } else {
        return {};
      }
    }
  };

  /* Check if there is any available CMS content, if so render Category like lister page */
  if (prismicData.node && prismicData.node.body) {
    return (
      <div>
        {prismicData.node.body.map(row => (
          <Row key={uid(row)}>
            <Col>
              <CmsRow type={row.type} data={row} />
            </Col>
          </Row>
        ))}
      </div>
    );
  }

  /* If there is no Category CMS content, render regular lister page */
  return (
    <div>
      <div>
        {prismicData.node && prismicData.node.top_banner && (
          <img
            src={prismicData.node.top_banner.url}
            alt='Banner'
            css={{ width: "100%" }}
          />
        )}
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-start",
          flexWrap: "wrap"
        }}
      >
        {listerStore.tweakwiseSearchData
          ? listerStore.tweakwiseSearchData.items &&
            listerStore.tweakwiseSearchData.items.map(item => {
              return (
                <ListerTile
                  className='lister-tile'
                  tileHeight={tileHeight}
                  data={item}
                  key={uid(item)}
                  promotionalTagObject={findPromotionaTag(item)}
                />
              );
            })
          : Array(20)
              .fill()
              .map((el, index) => <ListerTileLoader key={uid(index)} />)}
      </div>
      <div>
        {/* If no results found display error */}
        {listerStore.tweakwiseSearchData &&
          listerStore.tweakwiseSearchData.items &&
          listerStore.tweakwiseSearchData.items.length === 0 && (
            <div css={{ fontSize: "1.6rem", fontWeight: "700" }}>
              <div css={{ marginBottom: "1.6rem" }}>
                {I18n("No items found")}
              </div>
              <Link to='/'>
                <ArrowButton>{I18n("Verder winkelen")}</ArrowButton>
              </Link>
            </div>
          )}
      </div>
      <PrismicParagraphWrapper>
        {prismicData &&
          prismicData.node &&
          prismicData.node.bottom_description.map(el => {
            return <p key={uid(el)}>{el.text}</p>;
          })}
      </PrismicParagraphWrapper>
    </div>
  );
};

ContentRender.propTypes = {
  tileHeight: PropTypes.number,
  promotionalTagsArray: PropTypes.object,
  prismicData: PropTypes.shape({
    node: PropTypes.object
  }),
  listerStore: PropTypes.object
};

export default ContentRender;
