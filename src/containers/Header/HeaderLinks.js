import styled from '@emotion/styled';

const HeaderLinks = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  text-decoration: none;
  @media ${ props => props.theme.media.lg } {
    display: none;
  }
  a {
    margin-right: 2rem;
    font-size: 1.2rem;
    text-decoration: none;
    text-transform: uppercase;
    color: ${ props => props.theme.color.silverGray };
    &:before {
      margin-right: 0.6rem;
      font-family: icomoon-jc !important;
      content: '\\e907';
    }
  }
`;

export default HeaderLinks;
