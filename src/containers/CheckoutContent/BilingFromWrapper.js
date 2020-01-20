import styled from '@emotion/styled';

const BillingFormWrapper = styled.div`
  font-size: 1.6rem;
  label {
    align-self: center;
  }
  .Error {
    text-align: left;
    white-space: nowrap;
    margin-bottom: 0;
  }
  .radio-wrapper {
    display: flex;
    input[type='radio'] {
      width: 2rem;
      margin-right: 1rem;
      font-size: 16px;
    }
    label {
      margin: 0;
    }
  }
  .register-password {
    .Error {
      white-space: normal;
    }
  }
`;

export default BillingFormWrapper;
