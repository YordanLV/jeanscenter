import styled from '@emotion/styled';

const Close = styled.span`
  padding: ${ props => props.padding || '0.8rem 1.4rem' };
  color: #fff;
  background-color: ${ props => props.theme.color.mainGreen };
  text-align: center;
  cursor: pointer;
  &:hover {
    background: ${ props => props.theme.color.primaryHover };
  }
  &:before {
    font-family: icomoon-jc;
    font-size: ${ props => props.fontSize || '1.7rem' };
    font-weight: 400;
    content: '\\e902';
  }
`;

export default Close;
