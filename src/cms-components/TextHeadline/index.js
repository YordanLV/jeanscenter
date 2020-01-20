import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { uid } from 'react-uid';
import { RichText } from 'prismic-reactjs';

const StyledTextHeadline = styled.div`
  padding: 3rem 2rem;
  color: ${ props => props.color || props.theme.color.mainGray };
  text-align: center;
  h1 {
    font-size: 3.2rem;
  }
  h2 {
    font-size: 2.8rem;
  }
  h3 {
    font-size: 2.4rem;
  }
  h4 {
    font-size: 2rem;
  }
  h5 {
    font-size: 1.6rem;
  }
  p {
    font-size: 1.6rem;
  }
`;

const TextHeadline = ({ data }) => {
  const fields = data.fields;
  return (
    <StyledTextHeadline>
      {fields.map(item => (
        <div key={uid(item)}>{RichText.render(item.rich_text_line)}</div>
      ))}
    </StyledTextHeadline>
  );
};

TextHeadline.propTypes = {
  data: PropTypes.shape({
    items: PropTypes.array
  })
};

export default TextHeadline;
