import styled from '@emotion/styled';

const FormikFormWrapper = styled.div`
  input {
    width: 100%;
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
  }
  label {
    margin-top: 1rem;
    align-self: center;
    cursor: pointer;
  }
  .Error {
    width: 100%;
    color: #a94442;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
  }
  select {
    appearance: none;
    outline: none;
    padding: 1.1rem 1.2rem;
    width: 100%;
    height: 4.6rem;
    background: #fff;
    border: ${ props => (props.errorMessage ? '0.1rem solid #a94442' : '0.1rem solid #EEEEEE') };
    border-radius: 0;
    &:focus {
      border: 0.1rem solid #5c616b;
    }
  }
`;

export default FormikFormWrapper;
