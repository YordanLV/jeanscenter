import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../layout';
import CategoryContent from '../containers/CategoryContent';
import Auth from '../components/Auth';
import Breadcrumbs from '../components/Breadcrumbs';

const Category = ({ pageContext }) => {
  return (
    <Layout pageContext={pageContext.locale}>
      <Auth hideDefault />
      <Breadcrumbs />
      <CategoryContent
        id={pageContext.id}
        prismicData={pageContext.prismic}
        listerData={pageContext.listerData}
        listerTree={pageContext.listerTree}
      />
    </Layout>
  );
};

Category.propTypes = {
  pageContext: PropTypes.shape({
    id: PropTypes.string,
    locale: PropTypes.object,
    prismic: PropTypes.object,
    listerData: PropTypes.object,
    listerTree: PropTypes.array
  })
};

export default Category;
