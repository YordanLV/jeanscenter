import React from 'react';
import PropTypes from 'prop-types';

import Auth from '../components/Auth';
import Layout from '../layout';
import CheckoutContent from '../containers/CheckoutContent';

const CheckoutPage = ({ pageContext }) => {
  return (
    <Layout pageContext={pageContext.locale} isSocialSectionVisible={false} isNavVisible={false}>
      <Auth hideDefault={true} />
      <CheckoutContent />
    </Layout>
  );
};

CheckoutPage.propTypes = {
  pageContext: PropTypes.shape({
    locale: PropTypes.object
  })
};

export default CheckoutPage;
