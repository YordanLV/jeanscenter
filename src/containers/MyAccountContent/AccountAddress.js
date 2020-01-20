import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';

import { I18n } from '../../i18n';
import H1 from '../../components/common/H1';
import Button from '../../components/common/Button';
import AccountInfo from './AddressInfo';
import { uid } from 'react-uid';
import Link from '../../components/Link';

const AccountAddressWrapper = styled.div`
  width: 100%;
  h1 {
    margin-bottom: 2rem;
    font-family: Century Gothic W01, sans-serif;
  }
  .box-title {
    font-size: 1.6rem;
    font-family: 'Century Gothic W01 Bold', sans-serif;
  }
  .box-info {
    margin-top: 0.5rem;
    font-size: 1.6rem;
  }
`;

const GreyBox = styled.div`
  margin-bottom: 2rem;
  padding: 1.6rem;
  background-color: #f7f7f7;
`;

const AddressButtonsWrapper = styled.div`
  margin-top: 1rem;
  margin-bottom: 2rem;
  .address__button {
    padding: 0.5rem 1rem;
    margin-right: 0.5rem;
    font-family: Century Gothic W01, sans-serif;
    font-size: 1.2rem;
    border: 0.1rem solid #ccc;
  }
`;

const AccountAddress = ({ userAddress }) => {
  return (
    <Row>
      <AccountAddressWrapper>
        <Col sm="12">
          <H1>{I18n('ADDRESS')}</H1>
        </Col>
        <Row>
          {userAddress && (
            <Col sm="12" md="6" lg="4" key={uid(userAddress)}>
              <GreyBox>
                <AccountInfo info={userAddress} />
                <AddressButtonsWrapper>
                  <Link to="/my-account/edit-address">
                    <Button className="address__button">{I18n('CHANGE')}</Button>
                  </Link>
                </AddressButtonsWrapper>
              </GreyBox>
            </Col>
          )}
        </Row>
      </AccountAddressWrapper>
    </Row>
  );
};

AccountAddress.propTypes = {
  userData: PropTypes.object,
  userAddress: PropTypes.object
};

export default AccountAddress;
