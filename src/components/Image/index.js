import { ImgTypes } from '../../util/constants';
const cloudName = 'jeanscentre';

// Use different optimisation options for images through cloudinary URL. Must use this one for less problems with formats (ex. GIFs)
export const imageUrl = (src, imgType = '') => {
  if (src) {
    switch (imgType) {
    case ImgTypes.thumbnail:
      return `https://res.cloudinary.com/${ cloudName }/image/fetch/w_100,h_120,fl_lossy,f_auto,q_auto:good/${ src }`;
    case ImgTypes.promotionalTag:
      return `https://res.cloudinary.com/${ cloudName }/image/fetch/w_110,h_110,f_auto,q_auto:good/${ src }`;
    case ImgTypes.pdpMainImage:
      return `https://res.cloudinary.com/${ cloudName }/image/fetch/w_700,h_1050,c_pad,b_white/${ src }`;
    case ImgTypes.brandLogo:
      return `https://res.cloudinary.com/${ cloudName }/image/fetch/f_auto,q_auto:good/${ src }`;
    default:
      return `https://res.cloudinary.com/${ cloudName }/image/fetch/f_auto,q_auto:good/${ src }`;
    }
  }
};
