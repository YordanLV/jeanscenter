import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import { I18n } from '../../i18n';
import ArrowLink from '../../components/ArrowLink';
import H1 from '../../components/common/H1';

const AccountOverviewWrapper = styled.div`
  .info-text {
    margin-bottom: 3.3rem;
    color: #91c400;
    font-size: 1.6rem;
  }
  .box-title {
    margin-bottom: 1.1rem;
    font-family: 'Century Gothic W01 Bold', sans-serif;
    font-size: 1.6rem;
  }
`;

const AccountOverview = ({ name }) => {
  return (
    <AccountOverviewWrapper>
      <H1>
        <span css={{ fontFamily: '"Century Gothic W01", sans-serif' }}>{I18n('HI')}</span> {name}
      </H1>
      <div className="info-text">{I18n('Here you can change your order history, address book and personal information.')}</div>

      <div css={{ marginBottom: '4rem' }}>
        <div className="box-title">{I18n('DIRECTORY')}</div>
        <ArrowLink text={I18n('Update your delivery addresses', true)} href="/my-account/address" />
      </div>

      <div css={{ marginBottom: '4rem' }}>
        <div className="box-title">{I18n('PROFILE')}</div>
        <ArrowLink text={I18n('Update your personal information', true)} href="/my-account/update-profile" />
        <ArrowLink text={I18n('Change your password', true)} href="/my-account/update-password" />
      </div>
    </AccountOverviewWrapper>
  );
};

AccountOverview.propTypes = {
  name: PropTypes.string
};

export default AccountOverview;
