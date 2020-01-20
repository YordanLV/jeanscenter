import React from "react";
import PropTypes from "prop-types";

import { uid } from "react-uid";
import styled from "@emotion/styled";
import { I18n } from "../../i18n";

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.6rem;
  .paginationNumbersWrapper .paginationNumber {
    display: inline-block;
    padding: 1.1rem 1.2rem;
    color: #444a55;
  }
  .selected {
    pointer-events: none;
    span {
      border-bottom: 0.1rem solid #444a55;
    }
  }
  .stepChange {
    align-self: center;
    padding: 0 1.2rem;
    font-size: 1.3rem;
    span {
      cursor: pointer;
    }
  }
  .endPage {
    color: #bfbfbf;
    cursor: not-allowed;
    span {
      pointer-events: none;
    }
  }
`;

const Pagination = ({ properties, handleChange }) => {
  const { nrofpages, currentpage, pageurl } = properties;

  return (
    <PaginationWrapper currentpage={currentpage}>
      <div className={currentpage === 1 ? "endPage stepChange" : "stepChange"}>
        <span
          onClick={handleChange}
          data-tweakwise={`${pageurl}&tn_p=${currentpage - 1}`}
        >
          {I18n("Varje")}
        </span>
      </div>
      <div className='paginationNumbersWrapper'>
        {Array(nrofpages)
          .fill()
          .map((item, index) => {
            /* Rendering only 5 page numbers at a time. */
            const actualIndex = index + 1;
            if (currentpage === 1 || currentpage === 2) {
              if (actualIndex > 5) return;
            } else if (currentpage === nrofpages) {
              if (actualIndex < currentpage - 4) return;
            } else if (currentpage === nrofpages - 1) {
              if (actualIndex < currentpage - 3) return;
            } else if (actualIndex > currentpage + 2) return;
            else if (actualIndex < currentpage - 2) return;
            return (
              <div
                className={
                  actualIndex === currentpage
                    ? `selected paginationNumber`
                    : "paginationNumber"
                }
                css={{ padding: "1rem" }}
                key={uid(index)}
              >
                <span
                  css={{ display: "inline-block", cursor: "pointer" }}
                  onClick={handleChange}
                  data-tweakwise={`${pageurl}&tn_p=${actualIndex}`}
                >
                  {actualIndex}
                </span>
              </div>
            );
          })}
      </div>
      <div
        className={
          currentpage === nrofpages ? "endPage stepChange" : "stepChange"
        }
      >
        <span
          onClick={handleChange}
          data-tweakwise={`${pageurl}&tn_p=${currentpage + 1}`}
        >
          {I18n("Velgende")}
        </span>
      </div>
    </PaginationWrapper>
  );
};

Pagination.propTypes = {
  properties: PropTypes.object,
  handleChange: PropTypes.func
};

export default Pagination;
