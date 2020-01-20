import React from "react";

import { I18n } from "../i18n";
/** Handled By Server For Now */

const NotFoundPage = ({ pageContext }) => {
  return (
    <>
      <h1>{I18n("Page 404 Title")}</h1>
      <p>{I18n("Page 404 Description")}</p>
    </>
  );
};

export default NotFoundPage;
