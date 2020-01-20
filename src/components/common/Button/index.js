import styled from '@emotion/styled';

const Button = styled.div`
  display: inline-block;
  padding: 1rem 2rem;
  color: ${ props => props.color || props.theme.color.mainGray };
  background-color: ${ props => props.bgColor || 'white' };
  border: none;
  font-family: 'Century Gothic W01 Bold', sans-serif;
  font-size: ${ props => props.fontSize || '1.6rem' };
  text-decoration: none;
  text-transform: uppercase;
  opacity:  ${ props => (props.disabled ? '0.6' : '1') };
  pointer-events:  ${ props => (props.disabled ? 'none' : 'auto') };
  cursor: pointer;
  &:hover {
    text-decoration: none;
    color: ${ props => props.color || props.theme.color.mainGray };
    background-color: ${ props => props.bgColorHover || '#fff' };
  }
    /* &:before {
    display: ${ props => (props.withArrow ? 'inline' : 'none') };
    content:  "\\${ props => (props.isLeftArrow ? 'e908' : 'e903') }";
    margin-right: ${ props => (props.move ? '0.6rem' : '1.2rem') };
    font-family: icomoon-jc!important;
    font-size: 1.6rem;
    font-weight: bold;
    transition: left .2s ease;
  } */
  &:focus {
    outline: 0;
  }
  @media ${ props => props.theme.media.md } {
    display: ${ props => (props.isShownOnMobile === 'false' ? 'none' : 'inline-block') };
    padding: ${ props => props.paddingMobile || '0.6rem' };
  }
`;

export default Button;
