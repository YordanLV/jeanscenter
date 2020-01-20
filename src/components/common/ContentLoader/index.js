import styled from '@emotion/styled';

const ContentLoader = styled.div`
  position: relative;
  display: inline-block;
  height: ${ props => props.height || '100%' };
  width: ${ props => props.width || '100%' };
  opacity: 0.1;
  margin: 0.4rem 0;
  background: gray;
  background: linear-gradient(to right, #828282 8%, #b3b3b3 35%, #828282 75%);
  background-size: 50%;
  animation-duration: 1.5s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
`;

export default ContentLoader;
