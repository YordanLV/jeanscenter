import React from 'react';
import propTypes from 'prop-types';
import styled from '@emotion/styled';
import { uid } from 'react-uid';

const StyledCheckMarkBox = styled.div`
  position: relative;
  padding: 3.5rem 2.5rem;
  background-color: ${ props => props.backgroundColor || 'white' };
  font-size: 1.6rem;
  ul{
    padding:0;
    list-style: none;
  }
  li{
    padding: 0.3rem 0 0.3rem 1.5rem;
      &:before {
        position: absolute;
        left: 0;
        padding-left:1.5rem;
        font-family: icomoon-jc;
        color: #91c400;
        content: '\\e907';
    }
  }
`;

const CheckMarkBox = ({ data }) => {
  const { primary, fields } = data;
  return (
    <StyledCheckMarkBox backgroundColor={primary.box_color}>
      <ul>
        {fields.map(item => <li key={uid(item)}>{item.list_item[0].text}</li>)}
      </ul>
    </StyledCheckMarkBox>
  );
};

CheckMarkBox.propTypes = {
  data: propTypes.object.isRequired
};

export default CheckMarkBox;
