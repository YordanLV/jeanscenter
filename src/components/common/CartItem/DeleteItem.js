import styled from '@emotion/styled';

const CloseItem = styled.div`
  display: flex;
  justify-content: center;
  align-self: center;
  width: 2.6rem;
  height: 2.6rem;
  min-width: 2.6rem;
  min-height: 2.6rem;
  background-color: #fcfcfc;
  border-radius: 50%;
  border: 0.01rem solid #737780;
  cursor: pointer;
  @media ${ props => props.theme.media.lg }{
    top: 0;
  }
  &:before {
    align-self: center;
    font-family: icomoon-jc;
    font-size: 1.3rem;
    font-weight: 400;
    color: #737780;
    content: '\\e902';
  }
`;

export default CloseItem;
