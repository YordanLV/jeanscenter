import { graphql } from 'gatsby';

export const NavFragment = graphql`
  fragment NavFragment on PRISMIC_Nav {
    name
    category
    category_url {
      ... on PRISMIC__ExternalLink {
        url
      }
    }
    category_key
    banner_image
    banner_url {
      ... on PRISMIC__ExternalLink {
        url
      }
    }
    body {
      ... on PRISMIC_NavBodySub_category {
        type
        label
        primary {
          sub_category
        }
        fields {
          product_type
          subcategory_key
          subcategory_url {
            ... on PRISMIC__ExternalLink {
              url
            }
          }
        }
      }
    }
  }
`;
