import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { uid } from 'react-uid';
import { Row, Col } from 'reactstrap';
import { RichText } from 'prismic-reactjs';

import { I18n } from '../../i18n';
import Button from '../common/Button';
import AlertBox from '../AlertBox';

const PaymentContentWrapper = styled.div`
  font-size: 1.6rem;
  img {
    height: 4rem;
    max-width: 7rem;
  }
  label {
    font-size: 1.6rem;
    cursor: pointer;
  }
`;

const PaymentExplanationTextWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  color: #a1a4aa;
  a {
    color: #444a55;
    text-decoration: none;
    &:hover {
      color: #ee582a;
    }
  }
  p {
    margin: 0;
  }
`;

const ThirdItemContent = ({
  paymentIconsData,
  getBuckarooResponse,
  paymentExplanationText,
  changeSelectedPaymentMethod,
  selectedPaymentMethod,
  isBuckarooCheckoutError
}) => {
  const SubmitButton = Button.withComponent('button');

  return (
    <>
      <PaymentContentWrapper>
        {isBuckarooCheckoutError && <AlertBox isError={true} text={I18n('Something went wrong please try again', true)} />}
        {paymentIconsData.map((item, index) => {
          return (
            <Row key={uid(item)} css={{ alignItems: 'center', flexWrap: 'nowrap' }}>
              <Col sm="1" css={{ display: 'flex', maxWidth: '4rem', height: '1.8rem' }}>
                <input
                  type="radio"
                  id={item.payment_text[0].text}
                  name="payment"
                  value={item.payment_text[0].text}
                  onChange={changeSelectedPaymentMethod}
                  checked={selectedPaymentMethod === item.payment_text[0].text}
                />
              </Col>
              <Col sm="1" css={{ maxWidth: '8.5rem', minWidth: '8.5rem' }}>
                <img src={item.payment_image.url} alt="" />
              </Col>
              <Col sm="9">
                <label htmlFor={item.payment_text[0].text}>{item.payment_text[0].text}</label>
              </Col>
            </Row>
          );
        })}
      </PaymentContentWrapper>
      <Row css={{ marginBottom: '2rem' }}>
        <Col sm="9" css={{ marginTop: '2rem' }}>
          <PaymentExplanationTextWrapper>{RichText.render(paymentExplanationText)}</PaymentExplanationTextWrapper>
        </Col>
        <Col sm="3" css={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '2rem' }}>
          <SubmitButton bgColorHover="#ee582a" bgColor="#91c400" color="#fff" onClick={getBuckarooResponse} css={{ width: '100%' }}>
            {I18n('Pay now')}
          </SubmitButton>
        </Col>
      </Row>
    </>
  );
};

ThirdItemContent.propTypes = {
  paymentIconsData: PropTypes.array,
  getBuckarooResponse: PropTypes.func,
  paymentExplanationText: PropTypes.array,
  changeSelectedPaymentMethod: PropTypes.func,
  selectedPaymentMethod: PropTypes.string,
  isBuckarooCheckoutError: PropTypes.bool
};

export default observer(ThirdItemContent);
