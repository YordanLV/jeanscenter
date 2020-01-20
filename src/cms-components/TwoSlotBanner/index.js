import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { uid } from 'react-uid';

import SmallBanner from '../SmallBanner';

const TwoSlotBanner = ({ data }) => {
  const { primary, fields } = data;
  return (
    <Row>
      {fields.map(field =>
        <Col sm='6' lg='6' key={uid(field)}>
          <div css={{ padding: '1rem 0' }}>
            <SmallBanner
              ctaUrl={field.button_url.url}
              buttonText={field.button_label[0].text}
              imgUrl={field.image.url}
              buttonTopPosition={primary.buttons_top_position}
              buttonBgColor={primary.buttons_bg_color}
              buttonTextColor={primary.buttons_text_color}/>
          </div>
        </Col>
      )}
    </Row>
  );
};

TwoSlotBanner.propTypes = {
  data: PropTypes.shape({
    primary: PropTypes.object,
    fields: PropTypes.array
  })
};

export default TwoSlotBanner;
