import styled from '@emotion/styled';

const H1 = styled.h1`
  font-size: ${ props => props.fontSize || '3.2rem' };
  color: ${ props => props.color || props.theme.color.mainGray };
`;

export default H1;
