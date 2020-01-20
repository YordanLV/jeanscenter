import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { uid } from 'react-uid';

import SmallBanner from '../SmallBanner';

const FiveSlotBanner = ({ data }) => {
  const { primary, fields } = data;
  return (
    <Row css={{ padding: '1rem 0' }}>
      <Col md='6'
        css={{ padding: '0!important' }}>
        <SmallBanner
          ctaUrl={primary.primary_button_url.url}
          buttonText={primary.primary_button_label[0].text}
          imgUrl={primary.primary_banner_image_desktop.url}
          buttonTopPosition={primary.primary_button_top_position}
          buttonBgColor={primary.buttons_bg_color}
          buttonTextColor={primary.buttons_text_color} />
      </Col>
      <Col md='6'>
        <Row>
          {fields.map(field =>
            <Col xs='6'
              css={{ padding: '0!important' }}
              key={uid(field)}>
              <SmallBanner
                ctaUrl={field.button_url.url}
                buttonText={field.button_label[0].text}
                imgUrl={field.image.url}
                buttonTopPosition={primary.secondary_buttons_top_position}
                buttonBgColor={primary.buttons_bg_color}
                buttonTextColor={primary.buttons_text_color} />
            </Col>
          )}
        </Row>
      </Col>
    </Row>
  );
};

FiveSlotBanner.propTypes = {
  data: PropTypes.shape({
    primary: PropTypes.object,
    items: PropTypes.array
  })
};

export default FiveSlotBanner;
