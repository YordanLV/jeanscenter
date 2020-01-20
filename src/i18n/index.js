import React from 'react';
import PropTypes from 'prop-types';

import t from './translations';
import { LocaleContext } from '../layout';

const I18n = (text, toString = false) => {
  if (toString) {
    return t['nl'][text];
  }
  return <LocaleContext.Consumer>{context => t[context.lang][text]}</LocaleContext.Consumer>;
};

I18n.propTypes = {
  text: PropTypes.string.isRequired
};

export { I18n, LocaleContext };
