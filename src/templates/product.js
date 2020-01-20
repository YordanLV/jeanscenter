import React from "react";
import PropTypes from "prop-types";

import Layout from "../layout";
import PdpContent from "../containers/PdpContent";
import Auth from "../components/Auth";
import Breadcrumbs from "../components/Breadcrumbs";

const PDP = ({ pageContext }) => {
  return (
    <Layout pageContext={pageContext.locale}>
      <Auth hideDefault={true} />
      <Breadcrumbs isPdp />
      <PdpContent
        id={pageContext.id}
        locale={pageContext.locale}
        pdpData={pageContext.pdpData}
        cmsData={pageContext.cmsData}
      />
    </Layout>
  );
};

PDP.propTypes = {
  pageContext: PropTypes.shape({
    id: PropTypes.string,
    pdpData: PropTypes.object,
    cmsData: PropTypes.object,
    locale: PropTypes.object
  })
};

export default PDP;
