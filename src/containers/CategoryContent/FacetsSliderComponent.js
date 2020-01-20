// @flow weak

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

// *******************************************************
// RAIL
// *******************************************************
const railOuterStyle = {
  position: 'absolute',
  width: '100%',
  height: 42,
  transform: 'translate(0%, -50%)',
  cursor: 'pointer'
  // border: '1px solid white',
};

const railInnerStyle = {
  position: 'absolute',
  width: '100%',
  height: 10,
  transform: 'translate(0%, -50%)',
  pointerEvents: 'none',
  backgroundColor: 'white',
  border: '1px solid #bfbfbf'
};

export function SliderRail ({ getRailProps }) {
  return (
    <Fragment>
      <div style={railOuterStyle} {...getRailProps()} />
      <div style={railInnerStyle} />
    </Fragment>
  );
}

SliderRail.propTypes = {
  getRailProps: PropTypes.func.isRequired
};

// *******************************************************
// HANDLE COMPONENT
// *******************************************************
export function Handle ({ domain: [min, max], handle: { id, value, percent }, disabled, getHandleProps }) {
  /* Used styled components for after property */
  const Slider = styled.div`
    &:after {
      font-family: icomoon-jc;
      content: '\\e912';
      font-size: 15px;
      position: absolute;
      color: #a1a4aa;
      top: 2px;
      left: 11px;
    }
  `;
  return (
    <Fragment>
      <div
        style={{
          left: `${ percent }%`,
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          WebkitTapHighlightColor: 'rgba(0,0,0,0)',
          zIndex: 5,
          width: 28,
          height: 42,
          cursor: 'pointer',
          // border: '1px solid white',
          backgroundColor: 'none'
        }}
        {...getHandleProps(id)}
      />
      <Slider
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        style={{
          left: `${ percent }%`,
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
          width: 34,
          height: 28,
          backgroundColor: disabled ? '#666' : '#5c616b'
        }}
      />
    </Fragment>
  );
}

Handle.propTypes = {
  domain: PropTypes.array.isRequired,
  handle: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired
  }).isRequired,
  getHandleProps: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

Handle.defaultProps = {
  disabled: false
};

// *******************************************************
// KEYBOARD HANDLE COMPONENT
// Uses a button to allow keyboard events
// *******************************************************
export function KeyboardHandle ({ domain: [min, max], handle: { id, value, percent }, disabled, getHandleProps }) {
  return (
    <button
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      style={{
        left: `${ percent }%`,
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        zIndex: 2,
        width: 24,
        height: 24,
        borderRadius: '50%',
        boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.3)',
        backgroundColor: disabled ? '#666' : '#ffc400'
      }}
      {...getHandleProps(id)}
    />
  );
}

KeyboardHandle.propTypes = {
  domain: PropTypes.array.isRequired,
  handle: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired
  }).isRequired,
  getHandleProps: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

KeyboardHandle.defaultProps = {
  disabled: false
};

// *******************************************************
// TRACK COMPONENT
// *******************************************************
export function Track ({ source, target, getTrackProps, disabled }) {
  return (
    <div
      style={{
        position: 'absolute',
        transform: 'translate(0%, -50%)',
        height: 14,
        zIndex: 1,
        backgroundColor: disabled ? '#999' : 'transperant',
        cursor: 'pointer',
        left: `${ source.percent }%`,
        width: `${ target.percent - source.percent }%`
      }}
      {...getTrackProps()}
    />
  );
}

Track.propTypes = {
  source: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired
  }).isRequired,
  target: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired
  }).isRequired,
  getTrackProps: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

Track.defaultProps = {
  disabled: false
};

// *******************************************************
// TICK COMPONENT
// *******************************************************
export function Tick ({ tick, count, format }) {
  return (
    <div>
      <div
        style={{
          position: 'absolute',
          marginTop: 14,
          width: 1,
          height: 5,
          backgroundColor: 'rgb(200,200,200)',
          left: `${ tick.percent }%`
        }}
      />
      <div
        style={{
          position: 'absolute',
          marginTop: 22,
          fontSize: 10,
          textAlign: 'center',
          marginLeft: `${ -(100 / count) / 2 }%`,
          width: `${ 100 / count }%`,
          left: `${ tick.percent }%`
        }}
      >
        {format(tick.value)}
      </div>
    </div>
  );
}

Tick.propTypes = {
  tick: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired
  }).isRequired,
  count: PropTypes.number.isRequired,
  format: PropTypes.func.isRequired
};

Tick.defaultProps = {
  format: d => d
};
