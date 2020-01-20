import styled from '@emotion/styled';

const H4 = styled.h4`
  font-size: ${ props => props.fontSize || '1rem' };
  color: ${ props => props.color || props.theme.color.mainGray };
`;

export default H4;
