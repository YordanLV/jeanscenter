import styled from '@emotion/styled';

const Legal = styled.div`
  text-align: right;
  a {
    font-size: 1.6rem;
    padding: 1rem 1.5rem;
  }
  @media ${ props => props.theme.media.sm } {
    text-align: left;
    a {
      display: block;
      padding: 1rem 0;
    }
  }
`;

export default Legal;
