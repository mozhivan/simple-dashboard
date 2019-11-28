import React from 'react';
import PropTypes from 'prop-types';

const GridRow = ({ cells, selected }) => (
  <tr className={selected ? 'selected' : ''}>
    {cells}
  </tr>
);

GridRow.propTypes = {
  selected: PropTypes.bool,
  cells: PropTypes.array,
};

export default GridRow;
