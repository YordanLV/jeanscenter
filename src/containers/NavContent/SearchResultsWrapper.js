import styled from '@emotion/styled';

const SearchResultsWrapper = styled.div`
  position: absolute;
  overflow-x: hidden;
  right: 0.8rem;
  top: 6.3rem;
  width: 40rem;
  background: #fff;
  border: 0.1rem solid #d0d2d4;
  @media ${ props => props.theme.media.lg } {
    top: 4.5rem;
    padding-left: 1rem;
    width: 100%;
  }
  .suggestionsWrapper {
    border-bottom: 0.1rem solid #d0d2d4;
    a {
      display: block;
      padding: 1.1rem 2rem;
      font-size: 1.6rem;
      color: ${ props => props.theme.color.mainGray };
      text-decoration: none;
      cursor: pointer;
      &:hover {
        color: ${ props => props.theme.color.primaryHover };
        background: #f7f7f7;
      }
    }
  }
  .productItem {
    display: flex;
    align-items: center;
    font-size: 1.6rem;
    padding: 1.1rem 2rem;
    &:hover {
      background: #f7f7f7;
      color: ${ props => props.theme.color.primaryHover };
    }
  }
`;

export default SearchResultsWrapper;
