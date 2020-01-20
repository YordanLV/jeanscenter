import React, { useState } from 'react';
import { Slider, Rail, Handles, Tracks } from 'react-compound-slider';
import styled from '@emotion/styled';

/* Default styles from the library */
import { SliderRail, Handle, Track } from './FacetsSliderComponent';

/* Custom styles for the slider */
const FacetInput = styled.input`
  position: absolute;
  margin-top: 2.5rem;
  width: 6.8rem;
  height: 4.6rem;
  padding: 1.1rem 1.2rem;
  font-size: 1.6rem;
  line-height: 1.42857143;
  color: #444a55;
  text-align: center;
  background-color: #fff;
  background-image: none;
  border: 0.1px solid #d0d2d4;
  appearance: none;
  border-radius: 0;
  box-shadow: inset 0 0 0 0 transparent;
  transition: border-color ease 0.15s, box-shadow ease-in-out 0.15s;
`;

const sliderStyle = {
  position: 'relative',
  width: '100%'
};

const FacetSlider = ({ pageurl, facet, changeTweakwiseSearchTerm }) => {
  const onChange = async values => {
    await changeTweakwiseSearchTerm(`${ pageurl }&tn_fk_${ facet.facetsettings.urlkey }=${ values[0] }-${ values[1] }`);
  };
  /* Slice method is used for cleaning up out of bound Mobx warning */
  const attribute = facet.attributes.attribute.slice();
  /* Initialy set the domain attributes to the initial range, if a slider is moved the initial range attributes become 2nd and 3rd from the array */
  const domain = [(attribute[2] && attribute[2].title) || attribute[0].title, (attribute[3] && attribute[3].title) || attribute[1].title];
  const [defaultValues, setDefaultValues] = useState([facet.attributes.attribute[0].title, facet.attributes.attribute[1].title]);
  const [inputValues, setInputValues] = useState([facet.attributes.attribute[0].title, facet.attributes.attribute[1].title]);

  const setDefaultValDelay = defaultValues => {
    setInputValues(defaultValues);
    clearTimeout(timeoutOnKeyUp);
    const timeoutOnKeyUp = setTimeout(() => {
      setDefaultValues(defaultValues);
    }, 1000);
  };
  // const defaultValues = [facet.attributes.attribute[0].title, facet.attributes.attribute[1].title];
  if (domain[0] === domain[1]) {
    return <div />;
  }
  return (
    <div style={{ position: 'relative', margin: '1.5rem auto', padding: '1.5rem', height: 120, width: '100%' }}>
      <Slider mode={2} step={1} domain={domain} onChange={onChange} rootStyle={sliderStyle} values={defaultValues}>
        <Rail>{({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}</Rail>
        <Handles>
          {({ handles, getHandleProps }) => (
            <div className="slider-handles">
              {handles.map(handle => (
                <Handle key={handle.id} handle={handle} domain={domain} getHandleProps={getHandleProps} />
              ))}
            </div>
          )}
        </Handles>
        <Tracks left={false} right={false}>
          {({ tracks, getTrackProps }) => (
            <div className="slider-tracks">
              {tracks.map(({ id, source, target }) => (
                <Track key={id} source={source} target={target} getTrackProps={getTrackProps} />
              ))}
            </div>
          )}
        </Tracks>
      </Slider>
      <FacetInput css={{ left: '0rem' }} type="text" value={inputValues[0]} onChange={e => setDefaultValDelay([e.target.value, defaultValues[1]])} />
      <FacetInput css={{ right: '0rem' }} type="text" value={inputValues[1]} onChange={e => setDefaultValDelay([defaultValues[0], e.target.value])} />
    </div>
  );
};

FacetSlider.propTypes = {};

export default FacetSlider;
