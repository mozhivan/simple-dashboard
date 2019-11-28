import React from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({
  list,
  label,
  onClick,
}) => (
  <div className="pagination-dropdown">
    <div className="pagination-dropdown-content">
      {list.map((val) => (
        <div
          key={val}
          onClick={() => onClick(val)}
        >
          {val}
        </div>
      ))}
    </div>
    <span>
      {label}
    </span>
  </div>
);

Dropdown.propTypes = {
  list: PropTypes.array,
  label: PropTypes.element,
  onClick: PropTypes.func,
};

export default Dropdown;
