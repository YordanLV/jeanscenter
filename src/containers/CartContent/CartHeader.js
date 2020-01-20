import React from 'react';
import { Row, Col } from 'reactstrap';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import { I18n } from '../../i18n';
import H1 from '../../components/common/H1';
import Link from '../../components/Link';
import ArrowText from '../../components/common/ArrowText';

const TextDropdownWrapper = styled.span`
  a {
    text-decoration: none;
    color: ${ props => props.theme.color.mainGray };
    &:hover {
      color: ${ props => props.theme.color.mainGray };
    }
  }
`;

const CheckoutTitle = styled.div`
  margin-bottom: 2rem;
  margin-top: 2.5rem;
  color: ${ props => props.theme.color.mainGray };
  font-family: 'Century Gothic W01 Bold';
  font-size: 1.6rem;
`;

const CartHeader = ({ isBasket, isCheckout, isOnlyInCart, numberItems }) => {
  return (
    <Row>
      {isOnlyInCart && (
        <Col>
          <H1 css={{ marginTop: '1.1rem' }}>{I18n('SHOPPING BASKET')}</H1>
          <div css={{ fontSize: '1.6rem', color: '#91c400', marginBottom: '5.4rem' }}>✓ {I18n('Free shipping')}</div>
        </Col>
      )}
      {isBasket && (
        <Col css={{ marginTop: '2.5rem' }}>
          <div css={{ fontSize: '1.6rem', color: '#444a55' }}>
            {numberItems === 1 ? '1' : '2'} {I18n('OF')} {numberItems} {I18n('ITEMS')}
          </div>
          <TextDropdownWrapper>
            <Link to="/cart" title="">
              <ArrowText text={I18n('View all', true)} marginBot="2rem" />
            </Link>
          </TextDropdownWrapper>
        </Col>
      )}

      {isCheckout && (
        <Col>
          <CheckoutTitle>{I18n('ORDER SUMMARY')}</CheckoutTitle>
        </Col>
      )}
    </Row>
  );
};

CartHeader.propTypes = {
  isBasket: PropTypes.bool,
  isCheckout: PropTypes.bool,
  isOnlyInCart: PropTypes.bool,
  numberItems: PropTypes.number
};

export default CartHeader;
