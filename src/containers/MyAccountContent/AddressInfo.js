import React from 'react';
import countryAbbreviationConverter from '../../util/countryAbbreviationConverter';
import PropTypes from 'prop-types';

const AddressInfo = ({ info }) => {
  return (
    <>
      <div className="box-title">
        {info.name} {info.insertion} {info.familyName}
      </div>
      <div className="box-info">
        {info.streetName} {info.houseNumber} {info.addition}
      </div>
      <div className="box-info">
        {info.postalCode} {info.city}
      </div>
      <div className="box-info">{countryAbbreviationConverter(info.country)}</div>
    </>
  );
};

AddressInfo.propTypes = {
  info: PropTypes.object
};

export default AddressInfo;
