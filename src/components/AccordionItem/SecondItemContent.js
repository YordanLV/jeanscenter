import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import { I18n } from '../../i18n';
import H4 from '../common/H4';
import TextDropdown from '../common/TextDropdown';
import Button from '../common/Button';

const ContentWrapper = styled.div`
  h4 {
    margin-bottom: 2rem;
    font-size: 1.6rem;
    font-family: 'Century Gothic W01 Bold';
  }
  .info-text {
    font-size: 1.6rem;
  }
`;

const SecondItemContent = ({ billingAddress, addShippingInformation, isCtaDisabled, deliveryTime }) => {
  const SubmitButton = Button.withComponent('button');
  const isUserLogged = false;

  const shippingInfo = () => {
    addShippingInformation(billingAddress);
  };

  return (
    <ContentWrapper>
      <div css={{ display: 'flex', justifyContent: 'space-between' }}>
        <H4 css={{ display: 'inline' }}>{I18n('DELIVERY ADDRESS')}</H4>
        <span css={{ color: '#91c400', fontSize: '1.4rem', lineHeight: '2.6rem' }}>{deliveryTime}</span>
      </div>
      <div className="info-text">
        {billingAddress.firstName.value} {billingAddress.lastName.value}
      </div>
      <div className="info-text">
        {billingAddress.streetName.value}&nbsp;
        {billingAddress.streetNumber.value}&nbsp;
        {billingAddress.additionalStreetInfo.value}
      </div>
      <div className="info-text">
        {billingAddress.postCode.value} {billingAddress.city.value}
      </div>
      <div className="info-text" css={{ marginBottom: '1.5rem' }}>
        {billingAddress.country.value}
      </div>
      <div css={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <TextDropdown text={I18n('Add a new address', true)} marginBot="1rem">
            {isUserLogged && <div css={{ marginBottom: '2rem', fontSize: '1.4rem' }}>{I18n('Add new address form')}</div>}
            {!isUserLogged && <div css={{ marginBottom: '2rem', fontSize: '1.4rem' }}>{I18n('new address not logged text')}</div>}
          </TextDropdown>
        </div>
        <SubmitButton
          bgColorHover="#ee582a"
          bgColor="#91c400"
          color="#fff"
          css={{ maxHeight: '4.4rem' }}
          disabled={isCtaDisabled}
          onClick={shippingInfo}
        >
          {I18n('TO PAYMENT METHOD')}
        </SubmitButton>
      </div>
    </ContentWrapper>
  );
};

SecondItemContent.propTypes = {
  billingAddress: PropTypes.object,
  addShippingInformation: PropTypes.func,
  isCtaDisabled: PropTypes.bool,
  deliveryTime: PropTypes.string
};

export default observer(SecondItemContent);
