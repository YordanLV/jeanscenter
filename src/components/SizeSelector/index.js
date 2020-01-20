import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { uid } from "react-uid";
import styled from "@emotion/styled";
import _ from "lodash";

import UnderlinedText from "../../components/common/UnderlinedText";
import { Container, Row, Col } from "reactstrap";
import { I18n } from "../../i18n";

const SizesWrapper = styled.div`
  display: inline-block;
  width: 100%;
  span {
    display: block;
    margin-top: 1.1rem;
    margin-bottom: 1.1rem;
    font-size: 1.6rem;
    font-style: italic;
    color: ${props => props.theme.color.mainGray};
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 0;
    margin: 0 0 1.6rem 0.1rem;
    list-style: none;
  }
  li {
    display: inline-block;
    min-width: 4rem;
    border: 0.1rem solid ${props => props.theme.color.silverGray};
    margin-left: -0.1rem;
    margin-top: -0.1rem;
    text-align: center;
    a {
      display: inline-block;
      width: 100%;
      padding: 0.5rem;
      font-size: 1.6rem;
      color: ${props => props.theme.color.mainGray};
      cursor: pointer;
      &:hover,
      &.selected {
        background-color: ${props => props.theme.color.mainGreen};
        color: white !important;
      }
      &[data-enabled="false"] {
        background-color: #bfbfbf;
        color: #a1a4aa;
        cursor: not-allowed;
      }
    }
  }
`;

const Sizes = ({ sizes, getSku, sizesModalTrigger }) => {
  const sizesArray =
    sizes.map(size => {
      const waistSize = size.waistSize;
      const lengthSizesSku = size.lengthSizes.map(lengthSize => {
        const lengthNumber = lengthSize.lengthSize;
        const sku = lengthSize.sku;
        return { lengthNumber, sku };
      });
      const lengthSizes = size.lengthSizes.map(lengthSize => {
        const lengthNumber = lengthSize.lengthSize;
        return lengthNumber;
      });
      return { waistSize, lengthSizes, lengthSizesSku };
    }) || [];

  const totalWaistSizes = sizesArray.map(size => {
    return size.waistSize;
  });

  const totalLengthSizes = _.uniq(
    [].concat.apply(
      [],
      sizes.map(size => {
        const lengthSizes = size.lengthSizes.map(lengthSize => {
          const lengthNumber = lengthSize.lengthSize;
          return lengthNumber;
        });
        return [...lengthSizes];
      })
    )
  ).sort();

  const [selectedWaistSizeNum, setSelectedWaistSizeNum] = useState(null);
  const [selectedLengthSizeNum, setSelectedLengthSizeNum] = useState(null);

  const findSku = () => {
    if (selectedWaistSizeNum && selectedLengthSizeNum) {
      return sizesArray
        .find(item => {
          return item.waistSize === selectedWaistSizeNum;
        })
        .lengthSizesSku.find(item => {
          return item.lengthNumber === selectedLengthSizeNum;
        }).sku;
    }
    if (selectedWaistSizeNum && !totalLengthSizes[0]) {
      return sizesArray.find(item => {
        return item.waistSize === selectedWaistSizeNum;
      }).lengthSizesSku[0].sku;
    }
    return null;
  };

  useEffect(() => {
    const skuNum = findSku();
    getSku(skuNum);
  }, [selectedWaistSizeNum, selectedLengthSizeNum]);

  const enabledLengthSizes = sizesArray.find(item => {
    return item.waistSize === selectedWaistSizeNum;
  });
  const enabledWaistSizes = sizesArray
    .filter(item => {
      return item.lengthSizes.includes(selectedLengthSizeNum);
    })
    .map(item => {
      return item.waistSize;
    });

  return (
    <SizesWrapper>
      {totalLengthSizes[0] ? (
        <span>{I18n("Choose waist size")}</span>
      ) : (
        <span>{I18n("Choose a size")}</span>
      )}
      <div css={{ display: "flex", width: "100%" }}>
        <Container css={{ padding: 0 }}>
          <Row>
            <Col
              xs='12'
              sm='12'
              md='12'
              lg='12'
              xl='9'
              css={{ paddingTop: "0.1rem" }}
            >
              <ul>
                {totalWaistSizes.map(waistSize => {
                  const isEnabled = enabledWaistSizes.length
                    ? enabledWaistSizes.includes(waistSize)
                    : true;
                  return (
                    <li key={uid(waistSize)}>
                      <a
                        onClick={
                          isEnabled
                            ? () => setSelectedWaistSizeNum(waistSize)
                            : () => {}
                        }
                        className={
                          selectedWaistSizeNum === waistSize ? "selected" : ""
                        }
                        data-enabled={isEnabled}
                      >
                        {waistSize}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </Col>
            <Col xs='12' sm='12' md='12' lg='12' xl='3'>
              <UnderlinedText onClick={sizesModalTrigger}>
                {I18n("Measure indicator")}
              </UnderlinedText>
            </Col>
          </Row>
        </Container>
      </div>
      {totalLengthSizes[0] && (
        <>
          <span>{I18n("Choose length size")}</span>
          <div css={{ display: "flex" }}>
            <ul>
              {totalLengthSizes.map(lengthSize => {
                const isEnabled = enabledLengthSizes
                  ? enabledLengthSizes.lengthSizes.includes(lengthSize)
                  : true;
                return (
                  <li key={uid(lengthSize)}>
                    <a
                      onClick={
                        isEnabled
                          ? () => setSelectedLengthSizeNum(lengthSize)
                          : () => {}
                      }
                      className={
                        selectedLengthSizeNum === lengthSize ? "selected" : ""
                      }
                      data-enabled={isEnabled}
                    >
                      {lengthSize}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </SizesWrapper>
  );
};

Sizes.propTypes = {
  sizes: PropTypes.object,
  getSku: PropTypes.func,
  sizesModalTrigger: PropTypes.func
};

export default Sizes;
