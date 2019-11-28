import React from 'react';
import PropTypes from 'prop-types';

const HeaderLink = ({
  label,
  linkClassName,
  linkRef,
  onMouseDown,
}) => (
  <a
    className={linkClassName}
    href={linkRef}
    onMouseDown={onMouseDown}
  >
    {label}
  </a>
);

HeaderLink.propTypes = {
  label: PropTypes.string,
  linkClassName: PropTypes.string,
  linkRef: PropTypes.string,
  onMouseDown: PropTypes.func,
};

export default HeaderLink;
