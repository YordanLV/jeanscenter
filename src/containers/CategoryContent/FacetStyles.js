import styled from '@emotion/styled';

export const HideOnMobile = styled.div`
  @media ${ props => props.theme.media.lg } {
    display: none;
  }
`;

export const FacetFilterButtonMobile = styled.button`
  display: none;
  margin: 0 auto;
  color: #333;
  width: 100%;
  border-color: #ccc;
  background-color: #fff;
  font-family: 'Century Gothic W01 Bold', sans-serif;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  border: 0.1rem solid gray;
  padding: 1.1rem 3rem;
  font-size: 1.6rem;
  user-select: none;
  transition: border-color ease;
  @media ${ props => props.theme.media.lg } {
    display: block;
  }
`;

export const Facet = styled.div`
  color: ${ props => props.theme.color.mainGray };
  @media ${ props => props.theme.media.lg } {
    &.facet-category {
      display: none;
      &:first-of-type {
        display: block;
      }
    }
  }
`;

export const FacetsLister = styled.div``;

export const FacetList = styled.ul`
  max-height: 600rem;
  margin-bottom: 4rem;
  padding: 0;
  overflow: hidden;
  transition: max-height 0.5s;
  list-style: none;
  &.collapsed {
    max-height: 0rem;
    margin-bottom: 0rem;
  }
  @media ${ props => props.theme.media.lg } {
    max-height: 0rem;
    margin-bottom: 0rem;
    &.collapsed {
      max-height: 600rem;
      margin-bottom: 4rem;
    }
  }
  li {
    padding: 6px 0;
    font-size: 1.6rem;
    a {
      text-transform: none;
      color: ${ props => props.theme.color.mainGray };
      cursor: pointer;
      &:hover {
        color: ${ props => props.theme.color.monzaRed };
      }
    }
  }
  .hide-excess {
    display: none;
  }
  .show-excess {
    display: block !important;
  }
  li.expand-text {
    cursor: pointer;
    &:hover {
      color: ${ props => props.theme.color.monzaRed };
    }
  }
  &.facetlist-category {
    @media ${ props => props.theme.media.lg } {
      li {
        display: block;
        height: 6rem;
        border: 0.1rem solid #d1d1d3;
        width: 95%;
        line-height: 5rem;
        font-family: 'Century Gothic W01 bold', sans-serif;
        background: #fff;
        margin: 0 auto 0.5rem;
        a {
          display: block;
          padding-left: 2rem;
          text-transform: uppercase;
          width: 100%;
        }
      }
    }
  }
`;

export const FacetName = styled.div`
  position: relative;
  font-size: 1.6rem;
  margin: 1.1rem 0;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  i {
    position: absolute;
    right: 1rem;
    top: 20%;
    font-family: icomoon-jc !important;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    transition: 0.3s transform;
    -webkit-font-smoothing: antialiased;
    &:before {
      content: '\\e910';
    }
  }
  &.collapsed {
    i {
      transform: rotate(180deg);
    }
  }
  @media ${ props => props.theme.media.lg } {
    i {
      transform: rotate(180deg);
    }
    &.collapsed {
      i {
        transform: rotate(0deg);
      }
    }
  }
  &.facetname-category {
    @media ${ props => props.theme.media.lg } {
      display: none;
    }
  }
`;

export const FacetMobileMenuHeader = styled.h2`
  display: none;
  margin-top: 2rem;
  margin-bottom: 2rem;
  text-transform: uppercase;
  font-family: 'Century Gothic W01 bold', sans-serif;
  text-align: center;
  font-size: 24px;
  @media ${ props => props.theme.media.lg } {
    display: block;
  }
`;

export const FacetColor = styled.div`
  display: inline-block;
  height: 1.8rem;
  width: 1.8rem;
  margin-right: 0.5rem;
  border: 1px solid #bfbfbf;
`;
