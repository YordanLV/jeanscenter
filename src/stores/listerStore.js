import { observable, action, runInAction } from 'mobx';
// Apis
import prismicQueryByField from '../apis/prismic-query-by-field';
import tweakwiseProductSearch from '../apis/tweakwise-product-search';
import localstorage from '../util/localstorage';
class ListerStore {
  @observable isCtaDisabled = false;
  @observable tweakwiseSearchData = '';
  @observable promotionalTagsArray = [];

  /**
   * Set listerStore
   * @param {string} searchTerm for fetching the tweakwise product search
   */

  @action
  cleanTweakwiseSeachData () {
    this.tweakwiseSearchData = '';
  }

  @action
  async tweakwiseSearch (searchTerm, triggerReload = false) {
    this.isCtaDisabled = true;
    if (triggerReload) {
      this.cleanTweakwiseSeachData();
    }
    try {
      /* If search term includes tn_q it means its a search query */
      const tweakwiseSearchData = await tweakwiseProductSearch(searchTerm, searchTerm.includes('tn_q'));
      localstorage.setItem('tweakwiseSearchParams', searchTerm);
      runInAction(() => {
        this.tweakwiseSearchData = tweakwiseSearchData.body.navigation;
      });
    } catch (e) {
      console.log(e);
    }
    this.isCtaDisabled = false;
  }

  @action
  async fetchPromotionalTagsFromPrismic () {
    try {
      const data = await prismicQueryByField('promo_tag');
      if (data.results.length) {
        const normalizedRsults = data.results[0].data.body.map(val => ({
          promotion_name: val.primary.promotion_name,
          alt: val.primary.promotion_image.alt,
          url: val.primary.promotion_image.url,
          dimensions: val.primary.promotion_image.dimensions
        }));
        this.promotionalTagsArray = normalizedRsults;
        return normalizedRsults;
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export default new ListerStore();
