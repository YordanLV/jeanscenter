import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { uid } from 'react-uid';
import { Row, Col } from 'reactstrap';
import _ from 'lodash';

import NavSearchForm from './NavSearchForm';
import SearchResultsWrapper from './SearchResultsWrapper';
import { I18n } from '../../i18n';
import Input from '../../components/common/InputText/Input';
import Link from '../../components/Link';
import sleep from '../../util/sleep';

@inject('searchStore')
@observer
class NavSearch extends Component {
  constructor () {
    super();
    this.state = {
      searchTerm: '',
      isSearchShown: false
    };
    this.timer = null;
  }

  /* if no input change for 1sec call callTweakwiseAutocomplete */
  handleCheck = e => {
    this.setState({ searchTerm: e.target.value });
    clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      this.callTweakwiseAutocomplete(this.state.searchTerm);
    }, 1000);
  };

  /* call to get search data from tweakwise */
  callTweakwiseAutocomplete = searchTerm => {
    /* send call if more than 2 letters else hide search results */
    if (searchTerm.trim().length > 2) {
      this.props.searchStore.tweakwiseAutocomplete(searchTerm);
      this.setState({ isSearchShown: true });
    } else {
      this.setState({ isSearchShown: false });
      this.props.searchStore.clearSearchResults();
    }
  };

  /* on blur hide search results after 1 sec */
  hideSearcResults = async () => {
    await sleep(1000);
    this.setState({ isSearchShown: false });
  };

  /* when focused on the input and enter is pressed to submit the form */
  handleSubmit = e => {
    e.preventDefault();
    window.location.href = `/search?tn_q=${ this.state.searchTerm }`;
  };

  render () {
    const searchResults = this.props.searchStore.searchResults;

    return (
      <>
        <NavSearchForm action={`/search?tn_q=${ this.state.searchTerm }`} method="post">
          <Input
            type="text"
            placeholder={I18n('Zoek inspiratie of producten', true)}
            width="100%"
            required
            onChange={this.handleCheck}
            onBlur={this.hideSearcResults}
          />
          <a href={`/search?tn_q=${ this.state.searchTerm }`} className="searchButton" />
        </NavSearchForm>
        {searchResults && searchResults.items.length > 0 && this.state.isSearchShown && (
          <SearchResultsWrapper>
            <div className="suggestionsWrapper">
              {searchResults.suggestions.map((e, i) => {
                if (i > 5) return;
                /* Must be a href so it can reload the search query */
                return (
                  <a href={`/search?tn_q=${ e.title }`} title={e.title} key={uid(e.title + i)}>
                    {e.title}
                  </a>
                );
              })}
            </div>
            {searchResults.items.map((e, i) => {
              if (i > 3) return;
              /* variables create url for pdp */
              const title = e.title;
              const categoryAsUrl = e.attributes.attribute.filter(e => e.name === 'categoryAsUrl')[0].values.value;
              const slug = e.attributes.attribute.filter(e => e.name === 'slug')[0].values.value;
              const pdpUrl = `/${ categoryAsUrl }/${ _.kebabCase(title) }/${ _.kebabCase(slug) }`.toLowerCase();

              return (
                <Link to={pdpUrl} key={uid(title + i)}>
                  <Row className="productItem">
                    <Col xs="3" sm="3" md="2" lg="3">
                      <div css={{ height: '10rem', padding: '1rem' }}>
                        <img css={{ display: 'block', height: '100%', margin: '0 auto' }} src={e.image} />
                      </div>
                    </Col>
                    <Col xs="9" sm="9" md="10" lg="9">
                      <div css={{ height: '10rem', marginLeft: '1rem' }}>
                        <div>{title}</div>
                        <div css={{ fontFamily: 'Century Gothic W01 Bold' }}>{e.price}</div>
                      </div>
                    </Col>
                  </Row>
                </Link>
              );
            })}
          </SearchResultsWrapper>
        )}
      </>
    );
  }
}

NavSearch.propTypes = {
  searchStore: PropTypes.shape({
    tweakwiseAutocomplete: PropTypes.function,
    searchResults: PropTypes.object,
    clearSearchResults: PropTypes.func
  })
};

export default NavSearch;
