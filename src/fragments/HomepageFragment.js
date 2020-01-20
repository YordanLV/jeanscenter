import { graphql } from 'gatsby';

export const HomepageFragment = graphql`
  fragment HomepageFragment on PRISMIC_Homepage {
        body {
      ... on PRISMIC_HomepageBodyMarketing_message {
        type
        primary {
          message
        }
      }
      ... on PRISMIC_HomepageBodySingle_banner {
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
      ... on PRISMIC_HomepageBodyText_headline {
        type
        fields {
          rich_text_line
        }
      }
      ... on PRISMIC_HomepageBodyTwo_slot_banner {
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
      ... on PRISMIC_HomepageBodyFour_slot_banner {
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
      ... on PRISMIC_HomepageBodyFive_slot_banner {
        type
        primary {
          primary_button_label
          primary_button_url {
            ... on PRISMIC__ExternalLink {
              url
            }
          }
          primary_button_top_position
          secondary_buttons_top_position
          buttons_bg_color
          buttons_text_color
          primary_banner_image_desktop
          primary_banner_image_mobile
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
    }
  }
`;
