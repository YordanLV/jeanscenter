import styled from '@emotion/styled';

const WhiteBox = styled.div`
  padding: 4rem 5.6rem;
  background-color: white;
  @media ${ props => props.theme.media.padding } {
    padding: ${ props => (props.isCheckout ? '0 2rem' : '') };
  }
  @media ${ props => props.theme.media.md } {
    padding: 1.6rem;
  }
`;

export default WhiteBox;
