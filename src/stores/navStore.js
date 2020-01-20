import { observable, action, runInAction } from 'mobx';

import prismicQueryApi from '../apis/prismic-query-alphabetical-api';

class NavStore {
  @observable cmsData = {};
  @observable cmsLoaded = false;

  @observable isMobileActive = false;

  @action
  async fetchCmsData (lang) {
    try {
      const data = await prismicQueryApi('nav', lang);
      runInAction(() => {
        this.cmsData = data.results;
        this.cmsLoaded = true;
      });
    } catch (e) {
      console.log(e);
    }
  }

  /* Toggle mobile menu to show or hide */
  @action
  toggleMobileActive () {
    this.isMobileActive = !this.isMobileActive;
  }
}

export default new NavStore();
