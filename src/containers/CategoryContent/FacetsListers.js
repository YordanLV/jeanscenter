import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { uid } from "react-uid";

import {
  Facet,
  FacetsLister,
  FacetList,
  FacetName,
  FacetColor
} from "./FacetStyles";
import Link from "../../components/Link";
import FacetsLoader from "./FacetsLoader";
import FacetSlider from "./FacetSlider";
import colorLanguageConverter from "../../util/colorLanguageConverter";

const FacetsListers = ({
  tweakwiseSearchData,
  isCtaDisabled,
  handleChange,
  slideFacet,
  changeTweakwiseSearchTerm,
  handleExpandtext
}) => {
  return (
    <>
      <FacetsLister>
        {tweakwiseSearchData.facets ? (
          tweakwiseSearchData.facets.facet &&
          tweakwiseSearchData.facets.facet.map(facet => {
            /**
             * @param {string} selectiontype
             * Determines the type of facets to be rendered: link, checkbox, slider.
             * @param {string} expandtext
             * Clickable text for expanding of the facets.
             * @param {string} collapsetext
             * Clickable text for collapsing of the facets.
             * @param {boolean} iscollapsed
             * Checks if facet is collapsed or not
             * @param {boolean} iscollapsible
             * Determines if a facet is collabsabe or not
             * @param {boolean} isvisible
             * Determines if face is visible or not
             * @param {string} title
             * Title of the facet
             */
            const {
              selectiontype,
              collapsetext,
              expandtext,
              nrofshownattributes,
              iscollapsed,
              // iscollapsible,
              // isvisible,
              title
            } = facet.facetsettings;
            const facetAttribute = facet.attributes.attribute;
            return (
              <Fragment key={uid(facet)}>
                {/* Do not display categories on mobile */}
                <Facet className='facet-lister'>
                  <FacetName
                    className={iscollapsed ? "collapsed" : ""}
                    data-slide-toggle={uid(facet)}
                    onClick={slideFacet}
                  >
                    {facet.facetsettings.attributename} <i />
                  </FacetName>
                  <>
                    <FacetList
                      className={
                        (iscollapsed ? "collapsed" : "") + "hide-excessive"
                      }
                      data-slide-container={uid(facet)}
                    >
                      {facetAttribute.map((attribute, index) => {
                        /* If item is more than the allowed amount hide or show collapse/expand text */
                        const excessiveItem =
                          index >= nrofshownattributes ? "hide-excess" : "";
                        if (
                          selectiontype === "link" ||
                          selectiontype === "tree"
                        ) {
                          // eslint-disable-next-line valid-typeof
                          /* Strip  all slashes at the begging and end of the strings for consistatcy */
                          const pathName =
                            typeof window !== undefined &&
                            window.location.pathname.replace(/^\/|\/$/g, "");
                          return (
                            <li className={excessiveItem} key={uid(attribute)}>
                              <Link
                                /* Pathname for search set up to root, while pathname for everything else setup to the last instance */
                                to={`${
                                  pathName === "search" ? "/" : `/${pathName}/`
                                }${_.kebabCase(attribute.title)}`}
                                // data-tweakwise={attribute.url}
                                // onClick={handleChange}
                                css={
                                  attribute.isselected && { fontWeight: "600" }
                                }
                              >
                                {attribute.title}
                              </Link>
                            </li>
                          );
                        }
                        if (selectiontype === "checkbox") {
                          return (
                            <li className={excessiveItem} key={uid(attribute)}>
                              <label
                                css={{ display: "flex", alignItems: "center" }}
                              >
                                <input
                                  type='checkbox'
                                  disabled={isCtaDisabled}
                                  value={attribute.title}
                                  checked={attribute.isselected}
                                  data-group={facet.facetsettings.attributename}
                                  data-tweakwise={attribute.url}
                                  onChange={handleChange}
                                  className='facet-checkbox'
                                />
                                {title === "color" && (
                                  <FacetColor
                                    css={{
                                      backgroundColor: colorLanguageConverter(
                                        attribute.title
                                      )
                                    }}
                                  />
                                )}
                                {attribute.title}{" "}
                                <span
                                  css={{
                                    display: "inline-block",
                                    color: "#a1a4aa",
                                    fontSize: "1.4rem",
                                    paddingLeft: "0.5rem"
                                  }}
                                >
                                  ({attribute.nrofresults})
                                </span>
                              </label>
                            </li>
                          );
                        }
                        if (selectiontype === "slider") {
                          /* To prevent more than 1 slider from rendering */
                          return (
                            <Fragment key={uid(attribute)}>
                              {index === 0 && (
                                <FacetSlider
                                  pageurl={
                                    tweakwiseSearchData.properties.pageurl
                                  }
                                  changeTweakwiseSearchTerm={
                                    changeTweakwiseSearchTerm
                                  }
                                  facet={facet}
                                />
                              )}
                            </Fragment>
                          );
                        }
                      })}
                      {facetAttribute.length > nrofshownattributes && (
                        <li
                          onClick={handleExpandtext}
                          data-expandtext={expandtext}
                          data-collapsetext={collapsetext}
                          className='expand-text'
                        >
                          {expandtext}
                        </li>
                      )}
                    </FacetList>
                  </>
                </Facet>
              </Fragment>
            );
          })
        ) : (
          <FacetsLoader />
        )}
      </FacetsLister>
    </>
  );
};

FacetsListers.propTypes = {
  isCtaDisabled: PropTypes.bool,
  handleChange: PropTypes.func,
  slideFacet: PropTypes.func,
  handleExpandtext: PropTypes.func,
  changeTweakwiseSearchTerm: PropTypes.func,
  tweakwiseSearchData: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

export default FacetsListers;
