import React from 'react';
import PropTypes from 'prop-types';

const HeaderStatus = ({ message, visible }) => {
  const className = visible
    ? 'header-status fade-in'
    : 'header-status fade-out';

  return (
    <div className={className}>
      <p>{message}</p>
    </div>
  );
};

HeaderStatus.propTypes = {
  message: PropTypes.string,
  visible: PropTypes.bool,
};

export default HeaderStatus;
