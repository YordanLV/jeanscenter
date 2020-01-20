import styled from '@emotion/styled';

const ThumbnailWrapper = styled.div`
  display: ${ props => (props.imagesLength < 5 ? 'block' : 'flex') };
  flex-direction: ${ props => (props.imagesLength < 5 ? 'none' : 'row') };
  justify-content: ${ props => (props.imagesLength < 5 ? 'none' : 'space-between') };
  flex-wrap: wrap;
  @media screen and (max-width: 1400px) {
    flex-direction: ${ props => (props.imagesLength < 6 ? 'row' : 'row') };
    justify-content: ${ props => (props.imagesLength < 6 ? 'space-between' : 'flex-start') };
  }
  @media ${ props => props.theme.media.lg } {
    margin-bottom: 2rem;
    text-align: center;
    justify-content: ${ props => (props.imagesLength < 5 ? 'none' : 'center') };
  }
`;

export default ThumbnailWrapper;
