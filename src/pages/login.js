import React from 'react';
import PropTypes from 'prop-types';

import Auth from '../components/Auth';
import Layout from '../layout';
import LoginContent from '../containers/LoginContent';
import Breadcrumbs from '../components/Breadcrumbs';

const LoginPage = ({ pageContext }) => {
  return (
    <Layout pageContext={pageContext.locale}>
      <Auth hideDefault={true} />
      <Breadcrumbs breadcrumbsArray={[{ text: 'LOGGIN', url: '/login' }]} />
      <LoginContent />
    </Layout>
  );
};

LoginPage.propTypes = {
  pageContext: PropTypes.shape({
    locale: PropTypes.object
  })
};

export default LoginPage;
