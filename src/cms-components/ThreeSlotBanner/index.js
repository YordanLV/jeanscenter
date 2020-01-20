import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { uid } from 'react-uid';

import SmallBanner from '../SmallBanner';

const ThreeSlotBanner = ({ data }) => {
  const { primary, fields } = data;
  return (
    <Row>
      {fields.map(item =>
        <Col xs='4' key={uid(item)} css={{ padding: '0 8px' }}>
          <div css={{ padding: '1rem 0' }}>
            <SmallBanner
              ctaUrl={item.button_url.url}
              buttonText={item.button_label[0].text}
              imgUrl={item.image.url}
              buttonTopPosition={primary.button_top_position}
              buttonBgColor={primary.buttons_bg_color}
              buttonTextColor={primary.buttons_text_color}/>
          </div>
        </Col>
      )}
    </Row>
  );
};

ThreeSlotBanner.propTypes = {
  data: PropTypes.shape({
    primary: PropTypes.object,
    items: PropTypes.array
  })
};

export default ThreeSlotBanner;
