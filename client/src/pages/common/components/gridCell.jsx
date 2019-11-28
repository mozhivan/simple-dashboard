import React from 'react';
import PropTypes from 'prop-types';

const GridCell = ({ input, field }) => (
  <td className={`cell-${field}`}>
    {input}
  </td>
);

GridCell.propTypes = {
  input: PropTypes.element,
  field: PropTypes.string,
};

export default GridCell;
