import React from "react";
import PropTypes from "prop-types";

import Auth from "../components/Auth";
import Layout from "../layout";
import SignUpContent from "../containers/SignUpContent";
import Breadcrumbs from "../components/Breadcrumbs";

const SignUpPage = ({ pageContext }) => {
  return (
    <Layout pageContext={pageContext.locale}>
      <Auth hideDefault={true} />
      <Breadcrumbs breadcrumbsArray={[{ text: "SIGNUP", url: "/signup" }]} />
      <SignUpContent />
    </Layout>
  );
};

SignUpPage.propTypes = {
  pageContext: PropTypes.shape({
    locale: PropTypes.object
  })
};

export default SignUpPage;
