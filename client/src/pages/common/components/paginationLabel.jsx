import React from 'react';
import PropTypes from 'prop-types';
import { IoIosArrowUp } from 'react-icons/io';

const PaginationLabel = ({
  currentPage,
  pages,
}) => (
  <div className="pagination-label">
    {`Page ${currentPage}`}
    <IoIosArrowUp />
    {` of ${pages}`}
  </div>
);

PaginationLabel.propTypes = {
  currentPage: PropTypes.number,
  pages: PropTypes.number,
};

export default PaginationLabel;
