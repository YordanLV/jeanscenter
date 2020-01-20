import styled from '@emotion/styled';

const NavWrapper = styled.nav`
  z-index: ${ props => props.theme.zIndex.navWrapper || 1 };
  width: 100%;
  background-color: white;
  > img {
    width: 100%;
    height: auto;
  }
  .bottomBorderBelowLg {
    position: relative;
    @media ${ props => props.theme.media.lg } {
      border-bottom: 0.1rem solid #bfbfbf;
    }
  }
  /* bootstrap overflow-x: hidden hides the search results */
  .container {
    overflow-x: initial;
  }
`;

export default NavWrapper;
