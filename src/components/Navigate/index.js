import { navigate as gatsbyNavigate } from 'gatsby';

export const navigate = link => {
  if (typeof window !== 'undefined') {
    gatsbyNavigate(link);
  }
};
