import styled from '@emotion/styled';

const NavMenuWrapper = styled.ul`
  position: relative;
  height: 100%;
  padding-left: 1.6rem;
  margin-bottom: 0;
  color: ${ props => props.theme.color.mainGray || 'gray' };
  li {
    padding-left: 0;
    list-style: none;
  }
  > li {
    position: relative;
    display: inline-block;
    text-transform: uppercase;
    font-size: 1.5rem;
    line-height: 2rem;
    cursor: pointer;
    &.with-dropdown {
      &:hover {
        &:after,
        &:before {
          display: block;
        }
      }
      &:after,
      &:before {
        display: none;
        bottom: -2%;
        left: 50%;
        border: solid transparent;
        content: ' ';
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
      }

      &:after {
        border-color: transparent;
        border-bottom-color: white;
        border-width: 0.8rem;
        margin-left: -0.8rem;
      }
      &:before {
        border-color: transparent;
        border-bottom-color: rgba(0, 0, 0, 0.15);
        border-width: 1rem;
        margin-left: -1rem;
      }
    }
    > a {
      display: block;
      color: black;
      padding: 3rem 2.2rem;
      &:hover {
        text-decoration: none;
        > span {
          border-bottom: 2px ${ props => props.theme.color.mainGreen || 'gray' } solid;
        }
      }
    }
  }
  > li:hover > ul {
    display: flex;
    .container {
      display: flex;
    }
  }
  @media ${ props => props.theme.media.lg } {
    display: flex;
    justify-content: space-around;
    padding-left: 0;
    text-align: center;
    > li {
      line-height: 0.6rem;
    }
    > li:nth-of-type(n + 4) {
      display: none;
    }
    > li > a {
      padding: 2rem 2.2rem;
    }
    &.active_mobile {
      display: flex;
      flex-direction: column;
      text-align: initial;
      border-bottom: 0.1rem solid ${ props => props.theme.color.silverGray || 'gray' };
      > li:nth-of-type(n + 4) {
        display: block;
      }
    }
  }
`;

export default NavMenuWrapper;
