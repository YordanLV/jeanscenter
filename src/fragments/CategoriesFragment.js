import { graphql } from 'gatsby';

export const CategoriesFragment = graphql`
  fragment CategoriesFragment on PRISMIC_Category {
    category
    body {
      ... on PRISMIC_CategoryBodyThree_slot_banner {
        type
        primary {
          button_top_position
          buttons_bg_color
          buttons_text_color
        }
        fields {
          image
          button_label
          button_url {
          ... on PRISMIC__ExternalLink {
              url
            }
          }
        }
      }
      ... on PRISMIC_CategoryBodyText_headline {
        type
        fields {
          rich_text_line
        }
      }
      ... on PRISMIC_CategoryBodyParagraphs {
        type
        fields {
          paragraph
        }
      }
      ... on PRISMIC_CategoryBodyFour_slot_banner {
        type
        primary {
          buttons_top_position
          buttons_bg_color
          buttons_text_color
        }
        fields {
          image
          button_url {
            ... on PRISMIC__ExternalLink {
              url
            }
          }
          button_label
        }
      }
      ... on PRISMIC_CategoryBodySingle_banner {
        type
        primary {
          fluid
          image_desktop
          image_mobile
          buttons_top_position
          buttons_left_position
          buttons_top_position_mobile
          buttons_left_position_mobile
          buttons_bg_color
          button_text_color
        }
        fields {
          button_label
          button_url {
            ... on PRISMIC__ExternalLink {
              url
            }
          }
          is_shown_on_mobile
        }
      }
    }
  }
`;
