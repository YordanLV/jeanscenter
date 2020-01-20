const linkResolver = function (doc) {
  if (doc) {
    switch (doc.type) {
    case 'homepage':
      return '/';
    default:
      if (doc.uid) {
        return `/${ doc.uid }`;
      }
      return `/${ doc.type }`;
    }
  }
  return '/';
};

export default linkResolver;
