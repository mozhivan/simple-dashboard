import React from 'react';
import PropTypes from 'prop-types';

const Grid = ({
  disabled,
  gridHeader,
  gridRows,
}) => (
  <div className="grid">
    <table
      id="table_con"
      className={disabled ? 'disabled' : ''}
    >
      <tbody>
        {gridHeader}
        {gridRows}
      </tbody>
    </table>
  </div>
);

Grid.propTypes = {
  disabled: PropTypes.bool,
  gridHeader: PropTypes.element,
  gridRows: PropTypes.array,
};

export default Grid;
