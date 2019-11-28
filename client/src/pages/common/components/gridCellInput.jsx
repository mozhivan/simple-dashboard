import React from 'react';
import PropTypes from 'prop-types';

const GridCellInput = ({
  type,
  value,
  readOnly,
  onSelection,
  onChange,
  onFocus,
  onBlur,
}) => (
  <div className="grid-cell">
    <input
      className="grid-input"
      type={type}
      value={value}
      readOnly={readOnly}
      onMouseDown={onSelection}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  </div>
);

GridCellInput.propTypes = {
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.any,
  ]),
  readOnly: PropTypes.bool,
  onSelection: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

export default GridCellInput;
