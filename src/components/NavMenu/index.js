import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Container } from 'reactstrap';
import { uid } from 'react-uid';

import Link from '../Link';
import NavMenuWrapper from './NavMenuWrapper';
import Categories from './Categories';
import SubCategories from './SubCategories';

@inject('navStore')
@observer
class NavMenu extends Component {
  render () {
    return (
      <NavMenuWrapper className={this.props.navStore.isMobileActive && 'active_mobile'}>
        {this.props.cmsData.allMain_navs.edges[0].node.nav_items.map(categoryData => (
          <li key={uid(categoryData)} className={categoryData.nav_item.body ? 'with-dropdown' : ''}>
            <Link to={categoryData.nav_item.category_url && categoryData.nav_item.category_url.url}>
              <span>{categoryData.nav_item.category[0].text}</span>
            </Link>
            {categoryData.nav_item.body && (
              <Categories>
                <Container>
                  {categoryData.nav_item.body.map(subCategoryData => (
                    <li key={uid(subCategoryData)}>
                      <strong>{subCategoryData.primary.sub_category[0].text}</strong>
                      <SubCategories>
                        {subCategoryData.fields.map(productTypeData => (
                          <li key={uid(productTypeData)}>
                            <Link to={productTypeData.subcategory_url && productTypeData.subcategory_url.url}>
                              {productTypeData.product_type[0].text}
                            </Link>
                          </li>
                        ))}
                      </SubCategories>
                    </li>
                  ))}
                  {categoryData && categoryData.nav_item && categoryData.nav_item.banner_image && (
                    <li>
                      <Link to={categoryData.nav_item.banner_url.url}>
                        <img height="300" alt="Banner" src={categoryData.nav_item.banner_image.url} />
                      </Link>
                    </li>
                  )}
                </Container>
              </Categories>
            )}
          </li>
        ))}
      </NavMenuWrapper>
    );
  }
}

export default NavMenu;
