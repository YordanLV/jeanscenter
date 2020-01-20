import styled from '@emotion/styled';

const H2 = styled.h2`
  font-size: ${ props => props.fontSize || '1rem' };
  color: ${ props => props.color || props.theme.color.mainGray };
`;

export default H2;
