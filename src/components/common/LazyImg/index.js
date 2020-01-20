import React from 'react';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const LazyImg = ({ alt, src }) => (
  <LazyLoadImage
    alt={alt}
    effect="blur"
    src={src} />
);

LazyImg.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired
};

export default LazyImg;
