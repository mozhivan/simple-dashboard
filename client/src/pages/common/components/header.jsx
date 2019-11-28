import React from 'react';
import PropTypes from 'prop-types';
import HeaderLinks from '../containers/headerLinks';
import HeaderStatus from '../containers/headerStatus';

const Header = ({ search, controls }) => (
  <div className="header">
    <HeaderLinks search={search} />
    <HeaderStatus />
    {controls}
  </div>
);

Header.propTypes = {
  search: PropTypes.element,
  controls: PropTypes.element,
};

export default Header;
