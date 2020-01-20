import styled from '@emotion/styled';

const TilesPerRow = perRow => `${ 100 / perRow }%`;

const Tile = styled.div`
  display: block;
  padding: 0.7rem;
  transition: 0.35s;
  min-height: 30rem;
  width: ${ TilesPerRow(5) };
  @media ${ props => props.theme.media.lg } {
    width: ${ TilesPerRow(3) };
  }
  @media ${ props => props.theme.media.sm } {
    width: ${ TilesPerRow(2) };
  }
`;

export default Tile;
