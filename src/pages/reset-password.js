import React from "react";
import PropTypes from "prop-types";

import Auth from "../components/Auth";
import Layout from "../layout";
import ResetPasswordContent from "../containers/ResetPasswordContent";
import Breadcrumbs from "../components/Breadcrumbs";

const ResetPassword = ({ pageContext }) => {
  return (
    <Layout pageContext={pageContext.locale}>
      <Auth hideDefault={true} />
      <Breadcrumbs
        breadcrumbsArray={[{ text: "RESET PASSWORD", url: "/reset-password" }]}
      />
      <ResetPasswordContent />
    </Layout>
  );
};

ResetPassword.propTypes = {
  pageContext: PropTypes.shape({
    locale: PropTypes.object
  })
};

export default ResetPassword;
