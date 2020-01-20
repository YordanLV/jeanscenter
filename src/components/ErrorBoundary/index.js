import React from "react";
import PropTypes from "prop-types";

import { I18n } from "../../i18n";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    };
  }

  componentDidCatch(e) {
    this.setState({
      error: e
    });
  }

  render() {
    const { children, system } = this.props;
    if (this.state.error) {
      return (
        <div
          css={{
            backgroundColor: "#ffafaf",
            margin: "1rem",
            padding: "1rem",
            textAlign: "center"
          }}
        >
          <h1>
            {I18n("Error general:")} {system || "system"} <br />
            {I18n("Error general contact")}
          </h1>
        </div>
      );
    }
    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.object,
  system: PropTypes.string
};

export default ErrorBoundary;
