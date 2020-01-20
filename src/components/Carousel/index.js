import React, { useState } from "react";
import ReactImageMagnify from "react-image-magnify";

import ThumbnailWrapper from "./thumbnailWrapper";
import Thumbnail from "./thumbnail";
import BrandLogo from "../BrandLogo/";
import BrandLogoLoader from "../BrandLogo/BrandLogoLoader";
import { imageUrl } from "../Image";
import { ImgTypes } from "../../util/constants";
import propTypes from "prop-types";
import { I18n } from "../../i18n";

const PdpCarousel = ({ thumbnails, largeImgs, brandLogo }) => {
  const [mainImg, setMainImg] = useState(
    largeImgs.length ? largeImgs[0].url : ""
  );
  return largeImgs.length ? (
    <div>
      {brandLogo ? (
        <BrandLogo url={brandLogo.url} alt={brandLogo.alt} />
      ) : (
        <BrandLogoLoader />
      )}
      <div css={{ height: "100%" }}>
        <ReactImageMagnify
          style={{ zIndex: 1 }}
          {...{
            smallImage: {
              isFluidWidth: true,
              alt: "Product image",
              src: mainImg
            },
            largeImage: {
              width: 1200,
              height: 1800,
              src: mainImg
            }
          }}
        />
      </div>
      <ThumbnailWrapper imagesLength={thumbnails.length}>
        {thumbnails.map((thumbnail, index) => (
          <Thumbnail
            key={index}
            index={index}
            imagesLength={thumbnails.length}
            selected={
              imageUrl(thumbnail.url, ImgTypes.pdpMainImage) === mainImg
            }
            onClick={e => {
              // isImgLoading(true);
              setMainImg(e.target.getAttribute("data-large"));
            }}
            data-large={imageUrl(thumbnail.url)}
          >
            <img
              src={imageUrl(thumbnail.url, ImgTypes.pdpMainImage)}
              onClick={e => setMainImg(e.target.getAttribute("data-large"))}
              data-large={imageUrl(thumbnail.url, ImgTypes.pdpMainImage)}
            />
          </Thumbnail>
        ))}
      </ThumbnailWrapper>
    </div>
  ) : (
    <div>{I18n("There are no images for this product")}</div>
  );
};

PdpCarousel.propTypes = {
  thumbnails: propTypes.array,
  largeImgs: propTypes.array,
  brandLogo: propTypes.object
};

export default PdpCarousel;
