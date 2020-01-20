import { graphql } from 'gatsby';

export const SocialFragment = graphql`
  fragment SocialFragment on PRISMIC_Social {
    body{
      ...on PRISMIC_SocialBodySocial_netowrks {
        fields{
          icon
          text
          url{
            ...on PRISMIC__ExternalLink {
              url
            }
          }
        }
      }
    }
  }
`;
