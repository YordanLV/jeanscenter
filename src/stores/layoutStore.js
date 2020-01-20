import { observable, action, runInAction } from 'mobx';

import prismicSingleApi from '../apis/prismic-single-api';
class LayoutStore {
  @observable cmsHeaderData = {};
  @observable cmsFooterData = {};
  @observable cmsLoaded = false;
  @observable isError = false;

  @action
  async fetchCmsData (lang) {
    try {
      const data = await prismicSingleApi('layout', lang);
      runInAction(() => {
        this.cmsHeaderData = data.data.body;
        this.cmsFooterData = data.data.body1;
        this.cmsLoaded = true;
      });
    } catch (e) {
      runInAction(() => {
        this.isError = true;
        console.log(e);
      });
    }
  }
}

export default new LayoutStore();
