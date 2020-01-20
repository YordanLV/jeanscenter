import styled from '@emotion/styled';

const Categories = styled.ul`
  position: fixed;
  left: 0;
  display: none;
  width: 100%;
  padding-left: 0;
  border: 0.1rem rgba(0,0,0,.15) solid;
  box-shadow: 0 1px 3px rgba(0,0,0,.15);
  background-color: white;
  padding: 2rem;
  strong  {
    display: block;
    padding: 1rem 0;
    font-size: 1.8rem;
  }
  li {
    width: 20%;
  }
  @media ${ props => props.theme.media.lg }{
    display:none!important;
  }
`;

export default Categories;
