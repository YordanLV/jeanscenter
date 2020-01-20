import { observable, action } from 'mobx';

import tweakwiseAutocomplete from '../apis/tweakwise-autocomplete';

class SearchStore {
  @observable searchResults = null;

  @action
  async tweakwiseAutocomplete (searchWord, language) {
    try {
      const response = await tweakwiseAutocomplete(searchWord, language);
      this.searchResults = response.body.autocomplete;
    } catch (e) {
      console.log(e);
    }
  }

  @action
  async clearSearchResults () {
    this.searchResults = null;
  }
}

export default new SearchStore();
