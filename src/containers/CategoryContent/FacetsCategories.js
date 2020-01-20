import React from 'react';
import { Facet, FacetList, FacetName } from './FacetStyles';

import Link from '../../components/Link';
import { uid } from 'react-uid';

const FacetsCategories = ({ categoryNav }) => {
  return (
    <>
      {categoryNav.body.map(navFacet => {
        return (
          <Facet className="facet-category" key={uid(navFacet)}>
            <FacetName className="facetname-category">{navFacet.primary.sub_category[0].text}</FacetName>
            <FacetList className="facetlist-category">
              {navFacet.fields.map(facetItem => {
                return (
                  <li key={uid(facetItem)}>
                    <Link to={facetItem.subcategory_url.url}>{facetItem.product_type[0].text}</Link>
                  </li>
                );
              })}
            </FacetList>
          </Facet>
        );
      })}
    </>
  );
};

export default FacetsCategories;
