import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { uid } from 'react-uid';

import { imageUrl } from '../../components/Image';
import Link from '../../components/Link';
import ArrowButton from '../../components/common/ArrowButton';

const SingleBannerWrapper = styled.div`
  height: 100%;
  min-height: 30rem;
  text-align: center;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

const ButtonsWrapper = styled.div`
  position: absolute;
  top: ${ props => props.top || 80 }%;
  left: ${ props => props.left || 50 }%;
  transform: translate(-50%, -50%);
  text-align: center;
  @media ${ props => props.theme.media.md } {
    top: ${ props => props.topMobile || 80 }%;
    left: ${ props => props.leftMobile || 50 }%;
  }
`;

const SingleBanner = ({ data }) => {
  const { primary, fields } = data;
  return (
    <SingleBannerWrapper>
      <img className="img-fluid-fill d-none d-lg-inline" src={imageUrl(primary.image_desktop.url)} />
      <img className="img-fluid-fill d-xs-inline d-sm-inline d-lg-none" src={imageUrl(primary.image_mobile.url)} />
      <ButtonsWrapper
        top={primary.buttons_top_position}
        left={primary.buttons_left_position}
        topMobile={primary.buttons_top_position_mobile}
        leftMobile={primary.buttons_left_position_mobile}
      >
        {fields.map(field => (
          <Link to={field.button_url.url} key={uid(field)}>
            <ArrowButton
              isShownOnMobile={field.is_shown_on_mobile}
              bgColor={primary.buttons_bg_color}
              bgColorHover={primary.buttons_bg_color}
              color={primary.button_text_color}
              paddingMobile="0.6rem 0.6rem 0.6rem 2.6rem"
              margin="0.3rem"
              isCmsBanner={true}
            >
              {field.button_label[0].text}
            </ArrowButton>
          </Link>
        ))}
      </ButtonsWrapper>
    </SingleBannerWrapper>
  );
};

SingleBanner.propTypes = {
  data: PropTypes.shape({
    primary: PropTypes.object,
    items: PropTypes.array,
    fields: PropTypes.any
  })
};

export default SingleBanner;
