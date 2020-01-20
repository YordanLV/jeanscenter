import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import { I18n } from '../../i18n';
import H1 from '../../components/common/H1';
import UpdateAddressForm from './UpdateAddressForm';

const ChangeAddressWrapper = styled.div`
  font-size: 1.6rem;
`;

const AccountChangeAddress = ({ userAddress, accountUpdateUserAddress }) => {
  return (
    <ChangeAddressWrapper>
      <H1 css={{ fontFamily: 'Century Gothic W01' }}>{I18n('UPDATE ADDRESS')}</H1>
      <UpdateAddressForm userAddress={userAddress} accountUpdateUserAddress={accountUpdateUserAddress} />
    </ChangeAddressWrapper>
  );
};

AccountChangeAddress.propTypes = {
  userData: PropTypes.object,
  userAddress: PropTypes.object,
  accountUpdateUserAddress: PropTypes.func
};

export default AccountChangeAddress;
