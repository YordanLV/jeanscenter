import styled from '@emotion/styled';

const HR = styled.hr`
  border-top: ${ props => props.hrSize || '0.1rem' } solid ${ props => props.theme.color.silverGray || 'gray' };
`;

export default HR;
