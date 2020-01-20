import React, { useState } from "react";
import propTypes from "prop-types";

import PromotionalImageLoaded from "../PromotionalImage/PromotionalImageLoader";
import { imageUrl } from "../Image";
import { ImgTypes } from "../../util/constants";

const PromotionalImage = ({ src, alt, styles }) => {
  const [isImgLoading, setisImgLoading] = useState(true);
  let image = "";
  const ImageUndefined = typeof Image === "undefined";

  if (!ImageUndefined) {
    // eslint-disable-next-line no-undef
    image = new Image();
  }
  image.src = imageUrl(src, ImgTypes.promotionalTag);
  image.onload = function() {
    setisImgLoading(false);
  };
  image.onerror = function() {
    setisImgLoading(false);
  };

  return isImgLoading ? (
    <PromotionalImageLoaded />
  ) : (
    <img
      alt={alt}
      src={image.src}
      css={
        styles || {
          width: "6rem",
          "@media (max-width: 500px)": { width: "4.5rem" }
        }
      }
    />
  );
};

PromotionalImage.propTypes = {
  src: propTypes.string,
  alt: propTypes.string,
  styles: propTypes.object
};

export default PromotionalImage;
