import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { uid } from 'react-uid';
import { RichText } from 'prismic-reactjs';

const Paragraph = ({ data }) => {
  const { fields } = data;
  return (
    <Row css={{ marginTop: '4rem', marginBottom: '2rem' }}>
      {fields.map(item =>
        <Col sm='12' key={uid(item)}>
          <div css={{ fontSize: '1.6rem', marginBottom: '2.2rem' }}>{RichText.render(item.paragraph)}</div>
        </Col>
      )}
    </Row>
  );
};

Paragraph.propTypes = {
  data: PropTypes.shape({
    fields: PropTypes.array
  })
};

export default Paragraph;
