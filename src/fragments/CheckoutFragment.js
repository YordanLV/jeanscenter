import { graphql } from 'gatsby';

export const CheckoutFragment = graphql`
  fragment CheckoutFragment on PRISMIC_Checkout {
    checkout_title_step_one
    checkout_title_step_two
    checkout_title_step_three
    checkout_title_step_four
    checkout_explain_text
    delivery_time
    payment_explanation_text
  }
`;
