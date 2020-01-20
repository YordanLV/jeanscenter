import styled from '@emotion/styled';

const NavSearchForm = styled.form`
  width: 100%;
  position: relative;
  &:focus {
    position: absolute;
    width: 100%;
    background: red;
  }
  @media ${ props => props.theme.media.lg } {
    position: static;
  }
  input {
    width: 100%;
    font-size: 1.6rem;
    color: #444a55;
    &:focus {
      padding-left: 1.3rem;
    }
    &::placeholder {
      color: #c8c8c8;
    }
    @media ${ props => props.theme.media.lg } {
      &:focus {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        max-width: 100%;
        border: none;
      }
    }
  }
  .searchButton {
    position: absolute;
    right: 0.1rem;
    top: 0.1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 0.5rem;
    text-align: center;
    background: #fff;
    width: 4.5rem;
    height: 4.4rem;
    text-decoration: none;
    cursor: pointer;
    &:hover {
      width: 4.6rem;
      border-left: 0.1rem solid #c4c4c4;
    }
    &:before {
      color: #b9bdc2;
      font-size: 1.9rem;
      font-family: icomoon-jc !important;
      content: '\\e906';
      font-style: normal;
      font-weight: 400;
      font-variant: normal;
      text-transform: none;
      line-height: 1;
    }
  }
`;

export default NavSearchForm;
