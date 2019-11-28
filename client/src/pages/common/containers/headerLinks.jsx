import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HeaderLink from '../components/headerLink';

const HeaderLinks = ({
  pageOptions,
  activePage,
  search,
}) => (
  <div className="header-links">
    {pageOptions.map(({
      label,
      ref,
    }) => {
      const className = label === activePage ? 'active-link' : '';
      return (
        <HeaderLink
          key={label}
          label={label}
          linkClassName={className}
          linkRef={ref}
        />
      );
    })}
    {search}
  </div>
);

HeaderLinks.propTypes = {
  pageOptions: PropTypes.array,
  activePage: PropTypes.string,
  search: PropTypes.element,
};

const mapStateToProps = (state) => {
  const {
    activePage,
    pageOptions,
  } = state.common;
  return {
    pageOptions,
    activePage,
  };
};

export default connect(mapStateToProps, null)(HeaderLinks);
