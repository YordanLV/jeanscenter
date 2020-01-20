import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import styled from "@emotion/styled";

import Link from "../../components/Link";
import Tile from "./Tile";
import Price from "../Price";
import PromotionalImage from "../../components/PromotionalImage";
import { imageUrl } from "../../components/Image";

const TileTitle = styled.div`
  display: flex;
  margin-top: 1.1rem;
  margin-bottom: 1.1rem;
  color: black;
  font-family: "Century Gothic W01", sans-serif;
  font-size: 1.6rem;
  text-transform: uppercase;
  transition: 0.3s;
`;

const TileImage = styled.div`
  position: relative;
  height: calc(28.2rem - 2vw);
  .tile-image {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    max-width: 100%;
    max-height: 100%;
    height: auto;
    width: auto;
    z-index: 1;
  }
`;

const ListerTile = ({ data, tileHeight, promotionalTagObject }) => {
  const categories = data.attributes.attribute[5].values.value;
  const slug = data.attributes.attribute[6].values.value;
  const name = data.title;

  const linkItem = `/${categories}/${_.kebabCase(name)}/${_.kebabCase(slug)}`;
  return (
    <Tile>
      <Link to={linkItem} title={data.title} css={{ textDecoration: "none" }}>
        <div
          style={{
            backgroundColor: "white",
            position: "relative",
            padding: "0 1.6rem 4rem"
          }}
        >
          <TileImage>
            {promotionalTagObject &&
            Object.keys(promotionalTagObject).length > 0 ? (
              <PromotionalImage
                styles={{
                  zIndex: "2",
                  width: "6rem",
                  position: "absolute",
                  top: "-0.7rem",
                  right: "-2rem",
                  "@media (max-width: 500px)": { width: "5rem" }
                }}
                alt={promotionalTagObject.alt}
                src={promotionalTagObject.url}
              />
            ) : null}
            <img
              alt={data.title}
              className='tile-image'
              src={imageUrl(data.image)}
            />
          </TileImage>
          <TileTitle className='lister-tile' css={{ height: tileHeight }}>
            {data.title}
          </TileTitle>
          <span css={{ position: "absolute", bottom: "1rem" }}>
            <Price price={data.price + "00"} fontSize='1.8rem' />
          </span>
        </div>
      </Link>
    </Tile>
  );
};

ListerTile.propTypes = {
  tileHeight: PropTypes.number,
  promotionalTagObject: PropTypes.object,
  data: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number,
    attributes: PropTypes.object
  })
};

export default ListerTile;
