import styled from '@emotion/styled';

const AttributeBox = styled.div`
  margin-top: 1.5rem;
  padding: 1.5rem 1.5rem;
  background-color: #e1e5e5;
  font-size: 1.4rem;
  color: ${ props => props.theme.color.mainGray || 'gray' };
  text-transform: capitalize;
`;

export default AttributeBox;
