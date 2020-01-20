import React from "react";
import PropTypes from "prop-types";
import { imageUrl } from "../../components/Image";

import Link from "../../components/Link";
import ArrowButton from "../../components/common/ArrowButton";

const SmallBanner = props => {
  return (
    <Link
      to={props.ctaUrl}
      css={{
        display: "block",
        minHeight: "10rem",
        backgroundSize: "contain",
        textAlign: "center",
        textDecoration: "none"
      }}
    >
      <img
        className='img-fluid'
        alt={props.buttonText}
        src={imageUrl(props.imgUrl)}
      />
      <div
        css={{
          position: "absolute",
          display: "block",
          top: `${props.buttonTopPosition}%`,
          left: "50%",
          whiteSpace: "nowrap",
          transform: "translate(-50%, -50%)"
        }}
      >
        <ArrowButton
          bgColor={props.buttonBgColor}
          bgColorHover={props.buttonBgColor}
          color={props.buttonTextColor}
          paddingMobile='0.6rem 0.6rem 0.6rem 2.6rem'
          isCmsBanner={true}
        >
          {props.buttonText}
        </ArrowButton>
      </div>
    </Link>
  );
};

SmallBanner.propTypes = {
  ctaUrl: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  buttonBgColor: PropTypes.string.isRequired,
  buttonTextColor: PropTypes.string.isRequired,
  buttonTopPosition: PropTypes.number.isRequired
};

export default SmallBanner;
