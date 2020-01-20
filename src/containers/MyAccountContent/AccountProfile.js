import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import { I18n } from '../../i18n';
import H1 from '../../components/common/H1';
import ArrowLink from '../../components/ArrowLink';

const AccountProfileWrapper = styled.div`
  h1 {
    font-family: Century Gothic W01, sans-serif;
  }
  .profile-sub-title {
    margin-bottom: 1.1rem;
    font-family: 'Century Gothic W01 Bold', sans-serif;
    font-size: 1.6rem;
  }
`;

const ProfileInfo = styled.div`
  font-family: 'Century Gothic W01', sans-serif;
  font-size: 1.6rem;
  span {
    display: inline-block;
    width: 18rem;
    font-family: 'Century Gothic W01 Bold', sans-serif;
  }
`;

const AccountProfile = ({ userData }) => {
  return (
    <AccountProfileWrapper>
      <H1>{I18n('PROFILE')}</H1>
      <div className="profile-sub-title">{I18n('PERSONAL DATA')}</div>
      <ProfileInfo>
        <span>{I18n('Sex')}:</span> {userData.gender}
      </ProfileInfo>
      <ProfileInfo>
        <span>{I18n('First Name')}:</span> {userData.name}
      </ProfileInfo>
      <ProfileInfo css={{ marginBottom: '2rem' }}>
        <span>{I18n('Last Name')}:</span> {userData.familyName}
      </ProfileInfo>
      <ArrowLink text={I18n('Update your personal information', true)} href="/my-account/update-profile" marginBot="3.2rem" />
      <ProfileInfo css={{ marginBottom: '2rem' }}>
        <span>{I18n('E-mail address')}:</span> {userData.email}
      </ProfileInfo>
      <ArrowLink text={I18n('Change your email address', true)} href="/my-account/update-email" marginBot="3.2rem" />
      <ProfileInfo css={{ marginBottom: '2rem' }}>
        <span>{I18n('Password')}:</span> *****
      </ProfileInfo>
      <ArrowLink text={I18n('Change your password', true)} href="/my-account/update-password" />
    </AccountProfileWrapper>
  );
};

AccountProfile.propTypes = {
  userData: PropTypes.object
};

export default AccountProfile;
