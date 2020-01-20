import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import ArrowText from '../ArrowText';

const TextDropdown = ({ text, isLeftArrow, marginBot, children }) => {
  let [childrenVisibility, setChildrenVisibility] = useState('none');

  const ToggleVisibility = () => {
    const visibility = childrenVisibility === 'none' ? 'block' : 'none';
    setChildrenVisibility(visibility);
  };

  return (
    <Fragment>
      <ArrowText isLeftArrow={isLeftArrow} marginBot={marginBot} toggleVisibility={ToggleVisibility} text={text} />
      <div css={{ display: childrenVisibility, marginBottom: '1rem' }}>{children}</div>
    </Fragment>
  );
};

TextDropdown.propTypes = {
  text: PropTypes.string,
  isLeftArrow: PropTypes.bool,
  children: PropTypes.any,
  marginBot: PropTypes.string
};

export default TextDropdown;
