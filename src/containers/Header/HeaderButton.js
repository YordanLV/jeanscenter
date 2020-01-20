import styled from '@emotion/styled';

const HeaderButton = styled.div`
  position: relative;
  float: right;
  display: block;
  width: 33%;
  height:100%;
  padding: 1rem 1.6rem 1rem;
  background-color: ${ props => props.bgColor || 'black' };
  text-decoration: none;
  color: white!important;
  text-align: center;
  cursor: pointer;
  @media ${ props => props.theme.media.lg }{
      width:100%;
  }
  i {
    display: block;
    margin-bottom: 0.5rem;
    font-family: icomoon-jc;
    font-size: 2rem;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    -webkit-font-smoothing: antialiased;
    &:before{
      content: "\\${ props => props.iconHex }";
    }
  }
  span {
    margin-top:1rem;
    font-size: 1.2rem;
    text-transform: uppercase;
  }
  i.basket-icon {
    display: inline-block;
    font-size: 3.8rem;
    margin-right: 1.6rem;
  }
  span.basket-total {
    display: inline-block;
    vertical-align: super;
    font-size: 1.6rem;
    @media ${ props => props.theme.media.lg }{
      display: none;
    }
  }
  div.basket-items {
    position: absolute;
    background-color:${ props => props.theme.color.taraBlue };
    top: 1.5rem;
    left: calc(45% - 1rem);
    font-size: 1.2rem;
    padding: 0.2rem 0.7rem;
    border-radius: 50%;
    @media ${ props => props.theme.media.lg }{
      left: 47%;
    }
  }
`;

export default HeaderButton;
