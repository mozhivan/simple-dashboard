import React from 'react';
import PropTypes from 'prop-types';

const SearchPanel = ({
  options,
  onFilterChange,
  onFilterClick,
  filter,
}) => {
  const [{ label }] = options.filter((el) => el.name === filter);
  const placeHolder = `Search by ${label}`;
  return (
    <div className="search-panel">
      <input
        type="text"
        onChange={(e) => onFilterChange(e.target.value.toLowerCase())}
        placeholder={placeHolder}
      />
      <div className="search-filter-buttons">
        {options.map((bar) => {
          const classNameBtn = filter === bar.name ? 'active-filter' : '';
          return (
            <button
              className={classNameBtn}
              key={bar.name}
              type="button"
              onClick={() => onFilterClick(bar.name)}
            >
              {bar.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

SearchPanel.propTypes = {
  options: PropTypes.array,
  onFilterChange: PropTypes.func,
  onFilterClick: PropTypes.func,
  filter: PropTypes.string,
};

export default SearchPanel;
