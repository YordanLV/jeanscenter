import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const ArrowButtonWrapper = styled.button`
  opacity: ${ props => (props.disabled ? '0.6' : '1') };
  position: relative;
  display: inline-block;
  padding: 1rem 3rem 1rem 4rem;
  margin: ${ props => props.margin || 0 };
  color: ${ props => props.color || '#fff' };
  background-color: ${ props => props.bgColor || props.theme.color.mainGreen };
  border: none;
  font-family: 'Century Gothic W01 Bold', sans-serif;
  font-size: ${ props => props.fontSize || '1.6rem' };
  white-space: nowrap;
  text-decoration: none;
  text-transform: uppercase;
  pointer-events: ${ props => (props.disabled ? 'none' : 'auto') };
  cursor: pointer;
  &:hover {
    color: ${ props => props.color || '#fff' };
    background-color: ${ props => props.bgColorHover || props.theme.color.primaryHover };
    .button-arrow {
      left: 2.5rem;
    }
  }
  &:focus {
    outline: 0;
  }
  .button-arrow {
    position: absolute;
    left: 2rem;
    transition: 0.3s;
    &:before {
      content: '\\e903';
      font-family: icomoon-jc !important;
      font-size: 1.6rem;
      font-weight: bold;
    }
  }
  @media ${ props => props.theme.media.md } {
    display: ${ props => (props.isShownOnMobile === 'false' ? 'none' : 'inline-block') };
    padding: ${ props => props.paddingMobile || '1rem 3rem 1rem 4rem' };
    .button-arrow {
      left: ${ props => (props.isCmsBanner ? '1rem' : '2rem') };
    }
    &:hover {
      .button-arrow {
        left: ${ props => (props.isCmsBanner ? '1rem' : '2rem') };
      }
    }
  }
`;

const ArrowButton = ({
  children,
  onClickFunction,
  disabled,
  color,
  bgColor,
  fontSize,
  bgColorHover,
  isShownOnMobile,
  paddingMobile,
  margin,
  isCmsBanner
}) => {
  return (
    <ArrowButtonWrapper
      onClick={onClickFunction}
      disabled={disabled}
      color={color}
      bgColor={bgColor}
      fontSize={fontSize}
      bgColorHover={bgColorHover}
      isShownOnMobile={isShownOnMobile}
      paddingMobile={paddingMobile}
      margin={margin}
      isCmsBanner={isCmsBanner}
    >
      <span className="button-arrow" />
      {children}
    </ArrowButtonWrapper>
  );
};

ArrowButton.propTypes = {
  children: PropTypes.any,
  onClickFunction: PropTypes.func,
  disabled: PropTypes.bool,
  color: PropTypes.string,
  bgColor: PropTypes.string,
  fontSize: PropTypes.string,
  bgColorHover: PropTypes.string,
  isShownOnMobile: PropTypes.string,
  paddingMobile: PropTypes.string,
  margin: PropTypes.string,
  isCmsBanner: PropTypes.bool
};

export default ArrowButton;
