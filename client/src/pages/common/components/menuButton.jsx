import React from 'react';
import PropTypes from 'prop-types';

const MenuButton = ({
  children,
  onClick,
  disabled,
}) => (
  <div className="button-container">
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {[ ...children ]}
    </button>
  </div>
);

MenuButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default MenuButton;
