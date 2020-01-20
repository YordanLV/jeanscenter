import styled from '@emotion/styled';

const SubCategories = styled.ul`
  padding-left: 0;
  li {
    width:100%;
    a {
      display: block;
      color: ${ props => props.theme.color.mainGray || 'black' };
      line-height: 3rem;
      text-decoration:none;
      &:hover{
        color: ${ props => props.theme.color.monzaRed || 'black' };
      }
    }
  }
`;

export default SubCategories;
