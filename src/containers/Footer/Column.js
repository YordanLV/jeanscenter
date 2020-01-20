import styled from '@emotion/styled';

const Column = styled.div`
  ul {
    padding: 0;
    list-style: none;
    li {
      padding: 0.8rem 0;
      font-size: 1.6rem;
    }
  }
  @media ${ props => props.theme.media.sm } {
    ul {
      display: none;
    }
  }
`;

export default Column;
