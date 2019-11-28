import PropTypes from 'prop-types';
import React from 'react';
import { IoMdArrowRoundDown, IoMdArrowRoundUp } from 'react-icons/io';

const GridHeader = ({
  headerProps,
  onHeaderClick,
  sorting,
  sticky,
  headerRef,
}) => {
  const headerClassName = sticky ? 'sticky' : '';

  return (
    <tr
      className={headerClassName}
      ref={headerRef}
    >
      {headerProps.map((el) => {
        const {
          name,
          sortable,
          label,
        } = el;
        const [
          filter,
          order,
        ] = sorting;
        const arrow = order === 'ASC'
          ? <IoMdArrowRoundUp />
          : <IoMdArrowRoundDown />;
        const className = `cell-${name}`;
        return (
          <th
            className={className}
            key={name}
            onClick={() => sortable && onHeaderClick(name)}
          >
            <div className="header-content">
              {label}
              {name === filter
                ? arrow
                : ''}
            </div>
          </th>
        );
      })}
    </tr>
  );
};

GridHeader.propTypes = {
  onHeaderClick: PropTypes.func,
  headerProps: PropTypes.array,
  sorting: PropTypes.array,
  sticky: PropTypes.bool,
  headerRef: PropTypes.func,
};

export default GridHeader;
