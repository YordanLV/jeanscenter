import React from 'react';
import PropTypes from 'prop-types';
import { Location } from '@reach/router';

import Auth from '../components/Auth';
import Layout from '../layout';
import MyAccountContent from '../containers/MyAccountContent';
import Breadcrumbs from '../components/Breadcrumbs';

const CheckoutPage = ({ pageContext }) => {
  return (
    <Layout pageContext={pageContext.locale}>
      <Auth hideDefault={true} />
      {/* rerender Breadcrumbs on every route change */}
      <Location>
        {({ location }) => {
          return <Breadcrumbs location={location} />;
        }}
      </Location>
      <MyAccountContent />
    </Layout>
  );
};

CheckoutPage.propTypes = {
  pageContext: PropTypes.shape({
    locale: PropTypes.object
  })
};

export default CheckoutPage;
