import React from 'react';
import ContentLoader from '../common/ContentLoader';

const SizeSelectorLoader = () => (
  <>
    <ContentLoader css={{
      display: 'block',
      width: '6rem',
      height: '2.4rem',
      marginTop: '1.1rem',
      marginBottom: '1.1rem'
    }}/>
    <ContentLoader css={{
      display: 'block',
      width: '28rem',
      height: '3.5rem'
    }}/>
    <ContentLoader css={{
      display: 'block',
      width: '6rem',
      height: '2.4rem',
      marginTop: '2rem',
      marginBottom: '1.1rem'
    }}/>
    <ContentLoader css={{
      display: 'block',
      width: '14rem',
      height: '3.5rem'
    }}/>
     <ContentLoader css={{
       display: 'block',
       width: '4rem',
       height: '4rem',
       marginTop: '2rem',
       marginBottom: '2rem'
     }}/>
  </>
);

export default SizeSelectorLoader;
