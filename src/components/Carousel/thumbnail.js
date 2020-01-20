import styled from '@emotion/styled';

const Thumbnail = styled.div`
  display: inline-block;
  margin-top: 1.6rem;
  margin-bottom: 1.2rem;
  margin-right: ${ props => (props.imagesLength < 5 ? '1rem' : 0) };
  border: 0.1rem solid ${ props => (props.selected ? props.theme.color.mainGray : props.theme.color.silverGray) };
  background-color: ${ props => (props.selected ? props.theme.color.mainGray : 'white') };
  cursor: pointer;
  @media screen and (max-width: 1400px) {
    margin-right: ${ props => (props.imagesLength < 5 ? '1rem' : props.imagesLength < 6 ? 0 : '0.864rem') };
  }
  &:hover {
    border: 1px solid ${ props => props.theme.color.mainGray };
  }
  img {
    max-width: 10rem;
    min-width: 100%;
    height: auto;
    @media screen and (max-width: 1400px) {
      max-width: 8rem;
    }
    @media ${ props => props.theme.media.xl } {
      max-width: 7rem;
    }
  }
  @media ${ props => props.theme.media.lg } {
    height: 2rem;
    width: 2rem;
    margin-right: 1rem;
    border-radius: 50%;
    img {
      display: none;
    }
    &:hover {
      background-color: ${ props => props.theme.color.mainGray };
    }
  }
`;

export default Thumbnail;
