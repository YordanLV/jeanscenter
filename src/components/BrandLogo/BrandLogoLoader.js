import React from 'react';
import ContentLoader from '../common/ContentLoader';

const BrandLogoLoader = () => (
  <>
    <ContentLoader
      css={{
        position: 'absolute',
        zIndex: '2',
        top: '1rem',
        left: '2rem',
        width: '12rem'
      }}
    />
  </>
);

export default BrandLogoLoader;
