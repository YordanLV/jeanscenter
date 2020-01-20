import styled from '@emotion/styled';

const HeaderWrapper = styled.div`
  z-index: ${ props => props.theme.zIndex.headerWrapper || 1 };
  top: 0;
  width: 100%;
  background-color: ${ props => props.theme.color.mainGray || 'white' };
  @media ${ props => props.theme.media.lg } {
    border-bottom: 0.1rem ${ props => props.theme.color.silverGray } solid;
    background-color: white;
  }
`;

export default HeaderWrapper;
