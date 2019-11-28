import React from 'react';
import PropTypes from 'prop-types';

const GridCellTextarea = ({
  expanded,
  value,
  readOnly,
  onSelection,
  onChange,
  onFocus,
  onBlur,
}) => (
  <div className="grid-cell">
    <textarea
      className={expanded ? 'grid-textarea expanded' : 'grid-textarea'}
      value={value}
      readOnly={readOnly}
      onMouseDown={onSelection}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  </div>
);

GridCellTextarea.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.any,
  ]),
  expanded: PropTypes.bool,
  readOnly: PropTypes.bool,
  onSelection: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

export default GridCellTextarea;
