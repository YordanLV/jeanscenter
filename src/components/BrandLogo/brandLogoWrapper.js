import styled from '@emotion/styled';

const BrandLogoWrapper = styled.div`
  position: absolute;
  z-index: ${ props => props.theme.zIndex.brandLogo };
  top: 1rem;
  left: 2rem;
  width: 12rem;
  img {
    height: auto;
    width: 100%;
  }
  @media ${ props => props.theme.media.sm } {
    width: 8rem;
  }
`;

export default BrandLogoWrapper;
