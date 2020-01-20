import styled from '@emotion/styled';

const Logos = styled.div`
  a {
    display: inline-block;
    margin-right: 3rem;
  }
  @media ${ props => props.theme.media.lg } {
    margin-bottom: 3rem;
    a {
      margin-bottom: 3rem;
    }
  }
  @media ${ props => props.theme.media.lg } {
    margin-bottom: 0;
  }
`;

export default Logos;
