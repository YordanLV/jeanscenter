import { Link as GatsbyLink } from "gatsby";
import PropTypes from "prop-types";

import { LocaleContext } from "../../layout";

// Since DOM elements <a> cannot receive activeClassName,
// destructure the prop here and pass it only to GatsbyLink
const Link = ({ children, to, activeClassName, ...other }) => {
  // Tailor the following test to your environment.
  // This example assumes that any internal link (intended for Gatsby)
  // will start with exactly one slash, and that anything else is external.

  // Check if it is a relative link from the CMS
  if (to !== undefined && to !== null) {
    to = to.replace("https://{site}", "");
  }

  const internal = /^\/(?!\/)/.test(to);

  // Use Gatsby Link for internal links, and <a> for others
  if (internal) {
    return (
      <LocaleContext.Consumer>
        {context => {
          if (context.lang !== "nl") {
            to = context.lang + to;
          }
          return (
            <GatsbyLink
              to={to}
              css={{
                textDecoration: "none!important",
                color: "#212529",
                "&:hover": { color: "#212529" }
              }}
              activeClassName={activeClassName}
              {...other}
            >
              {children}
            </GatsbyLink>
          );
        }}
      </LocaleContext.Consumer>
    );
  }
  return (
    <a href={to} {...other}>
      {children}
    </a>
  );
};

Link.propTypes = {
  to: PropTypes.string,
  activeClassName: PropTypes.string
};

export default Link;
