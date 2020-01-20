import React from 'react';
import PropTypes from 'prop-types';

import Auth from '../components/Auth';
import Layout from '../layout';
import CartContent from '../containers/CartContent';
import Breadcrumbs from '../components/Breadcrumbs';

const CheckoutPage = ({ pageContext }) => {
  return (
    <Layout pageContext={pageContext.locale} isHeaderVisible={false} isSocialSectionVisible={false}>
      <Auth hideDefault={true} />
      <Breadcrumbs breadcrumbsArray={[{ text: 'SHOPPING BASKET', url: '/cart' }]} />
      <CartContent />
    </Layout>
  );
};

CheckoutPage.propTypes = {
  pageContext: PropTypes.shape({
    locale: PropTypes.object
  })
};

export default CheckoutPage;
