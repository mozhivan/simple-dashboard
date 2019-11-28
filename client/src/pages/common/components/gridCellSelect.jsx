import React from 'react';
import PropTypes from 'prop-types';

const GridCellSelect = ({
  readOnly,
  value,
  onChange,
  onBlur,
  options,
}) => (
  <select
    className="cell-lookup"
    disabled={readOnly}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    name="select"
  >
    {options.map(({ id, name }) => (
      <option
        key={name}
        data-param={id}
        value={name}
      >
        {name}
      </option>
    ))}
  </select>
);

GridCellSelect.propTypes = {
  readOnly: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  options: PropTypes.array,
};

export default GridCellSelect;
