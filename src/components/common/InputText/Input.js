
import styled from '@emotion/styled';

const Input = styled.input`
  vertical-align: top;
  padding: 1.1rem 1.2rem;
  height: 4.6rem;
  outline: none;
  &:focus {
    border: 0.1rem solid #5c616b;
  }
  &:disabled {
    background: #f7f7f7;
  }
`;

export default Input;
