import styled from '@emotion/styled';

const FooterWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  padding-top: 4rem;
  padding-bottom: 4rem;
  background-color: white;
  a {
    text-decoration: none;
    color: ${ props => props.theme.color.mainGray || 'black' };
    &:hover {
      color: ${ props => props.theme.color.primaryHover || 'red' };
    }
  }
  @media ${ props => props.theme.media.lg } {
    padding-left: 1.6rem;
    padding-right: 1.6rem;
  }
`;

export default FooterWrapper;
