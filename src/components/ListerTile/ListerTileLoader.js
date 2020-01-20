import React from 'react';
import ContentLoader from '../common/ContentLoader';
import Tile from './Tile';

const SizeSelectorLoader = () => (
  <Tile>
    <ContentLoader css={{ height: '35rem' }} />
  </Tile>
);

export default SizeSelectorLoader;
