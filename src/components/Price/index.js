import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const StyledPrice = styled.div`
  margin-left: ${ props => props.marginLeft || 0 };
  margin-top: 0;
  font-size: ${ props => props.fontSize || '4.6rem' };
  color: ${ props => props.color || props.theme.color.mainGray };
  text-decoration: ${ props => (props.isOldPrice ? 'line-through' : 'none') };
`;

const Price = ({ price, color, fontSize, marginLeft, isOldPrice }) => {
  const centAmount = Number(price);
  const euro = centAmount < 100 ? Math.floor(centAmount / 10) : Math.floor(centAmount / 100);
  const cents = price % 100;
  return (
    <StyledPrice color={color} fontSize={fontSize} marginLeft={marginLeft} isOldPrice={isOldPrice}>
      {isOldPrice ? (
        <>
          {euro}.{cents * 1 ? cents : '-'}
        </>
      ) : (
        <strong>
          {euro}.{cents * 1 ? <sup>{cents}</sup> : '-'}
        </strong>
      )}
    </StyledPrice>
  );
};

Price.propTypes = {
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
  fontSize: PropTypes.string,
  marginLeft: PropTypes.string,
  isOldPrice: PropTypes.bool
};

export default React.memo(Price);
