import { observable, action, runInAction } from 'mobx';
import listerStore from '../stores/listerStore';
// Apis
import commercetoolsProductApi from '../apis/commercetools-product-api';
import prismicSingleApi from '../apis/prismic-single-api';
import prismicQueryByField from '../apis/prismic-query-by-field';

class PdpStore {
  @observable pdpData = {};
  @observable isPdpLoaded = false;

  @observable pdpBrandObject = {};
  @observable pdpPromoTagObject = {};

  @observable cmsData = {};
  @observable isCmsLoaded = false;

  @action
  async fetchPdpData (productId) {
    try {
      this.isPdpLoaded = false;
      const data = await commercetoolsProductApi(productId);
      runInAction(() => {
        this.pdpData = data.body;
        this.isPdpLoaded = true;
      });
    } catch (e) {
      console.log(e);
    }
  }

  @action
  async fetchCmsData (lang) {
    try {
      const data = await prismicSingleApi('pdp', lang);
      runInAction(() => {
        this.cmsData = data.data.body;
        this.isCmsLoaded = true;
      });
    } catch (e) {
      console.log(e);
    }
  }

  @action
  async fetchBrandLogo () {
    try {
      const data = await prismicQueryByField('brands');
      if (data.results.length) {
        const normalizedRsults = data.results[0].data.body.map(val => ({
          brand_id: val.primary.brand_id,
          alt: val.primary.brand_logo.alt,
          url: val.primary.brand_logo.url,
          dimensions: val.primary.brand_logo.dimensions
        }));
        if (this.pdpData.brand) {
          const transformedBrandName = this.pdpData.brand.replace(' ', '_').toLowerCase();
          this.pdpBrandObject = normalizedRsults.filter(brand => brand.brand_id === transformedBrandName)[0];
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  @action
  async fetchPromotionalTags (promotionalTagsArray, lang) {
    try {
      if (promotionalTagsArray.length) {
        if (this.pdpData.promotionalBanner.length > 0) {
          const pdpPromoTagFilteredArray = promotionalTagsArray.filter(
            promotion => promotion.promotion_name === this.pdpData.promotionalBanner[0].name[lang]
          );
          this.pdpPromoTagObject = pdpPromoTagFilteredArray.length > 0 ? pdpPromoTagFilteredArray[0] : {};
        } else {
          this.pdpPromoTagObject = {};
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export default new PdpStore();
