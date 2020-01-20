import styled from '@emotion/styled';

const H6 = styled.h6`
  font-size: ${ props => props.fontSize || '1.6rem' };
  color: ${ props => props.color || props.theme.color.mainGray };
`;

export default H6;
