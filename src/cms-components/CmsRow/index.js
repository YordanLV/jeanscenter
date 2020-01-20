import React from 'react';
import propTypes from 'prop-types';

import ErrorBoundary from '../../components/ErrorBoundary';

import MarketingMessage from '../MarketingMessage';
import SingleBanner from '../SingleBanner';
import TextHeadline from '../TextHeadline';
import TwoSlotBanner from '../TwoSlotBanner';
import FourSlotBanner from '../FourSlotBanner';
import FiveSlotBanner from '../FiveSlotBanner';
import CheckMarkBox from '../CheckMarkBox';
import ThreeSlotBanner from '../ThreeSlotBanner';
import Paragraph from '../Paragraph';

const CmsComponent = ({ type, data }) => {
  switch (type) {
  case 'marketing_message':
    return <MarketingMessage data={data}/>;
  case 'single_banner':
    return <SingleBanner data={data}/>;
  case 'text_headline':
    return <TextHeadline data={data}/>;
  case 'two_slot_banner':
    return <TwoSlotBanner data={data}/>;
  case 'three_slot_banner':
    return <ThreeSlotBanner data={data}/>;
  case 'four_slot_banner':
    return <FourSlotBanner data={data}/>;
  case 'five_slot_banner':
    return <FiveSlotBanner data={data}/>;
  case 'checkmark_box':
    return <CheckMarkBox data={data}/>;
  case 'paragraphs':
    return <Paragraph data={data}/>;
  default:
    return null;
  }
};

const CmsRow = ({ type, data }) => (
  <ErrorBoundary system='CMS'>
    <CmsComponent type={type} data={data}/>
  </ErrorBoundary>
);

CmsComponent.propTypes = {
  type: propTypes.string,
  data: propTypes.object
};

CmsRow.propTypes = {
  type: propTypes.string,
  data: propTypes.object
};

export default CmsRow;
