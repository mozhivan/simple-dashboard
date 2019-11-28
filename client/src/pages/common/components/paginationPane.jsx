import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {
  IoIosArrowBack,
  IoIosArrowForward,
} from 'react-icons/io';
import Dropdown from './dropdown';
import PaginationLabel from './paginationLabel';

const PaginationPane = ({
  currentPage = 1,
  pages = 1,
  onPrevClick,
  onNextClick,
  selectPage,
}) => (
  <div className="pagination-pane">
    <button
      type="button"
      onClick={() => onPrevClick(currentPage, pages)}
    >
      <IoIosArrowBack />
      {'Prev'}
    </button>
    <Dropdown
      label={(
        <PaginationLabel
          currentPage={currentPage}
          pages={pages}
        />
      )}
      list={_.range(1, pages + 1)}
      onClick={selectPage}
    />
    <button
      type="button"
      onClick={() => onNextClick(currentPage, pages)}
    >
      {'Next'}
      <IoIosArrowForward />
    </button>
  </div>
);

PaginationPane.propTypes = {
  currentPage: PropTypes.number,
  pages: PropTypes.number,
  onPrevClick: PropTypes.func,
  onNextClick: PropTypes.func,
  selectPage: PropTypes.func,
};

export default PaginationPane;
