import React from "react";
import propTypes from "prop-types";
import { imageUrl } from "../Image";

import BrandLogoWrapper from "./brandLogoWrapper";

const BrandLogo = ({ url, alt }) => (
  <BrandLogoWrapper>
    <img src={imageUrl(url)} alt={alt} />
  </BrandLogoWrapper>
);

BrandLogo.propTypes = {
  url: propTypes.string,
  alt: propTypes.string
};

export default BrandLogo;
