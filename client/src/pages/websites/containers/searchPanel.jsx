import _ from 'lodash';
import { connect } from 'react-redux';
import { applyFilter, filterData } from '../actions/websitesActions';
import SearchPanel from '../../common/components/searchPanel';

const mapStateToProps = (state) => {
  const {
    headerProps,
    filter,
  } = state.websites;
  return {
    filter,
    options: _.filter(headerProps, (el) => el.searchable),
  };
};

const mapDispatchToProps = (dispatch) => ({
  onFilterClick: (filter) => dispatch(applyFilter(filter)),
  onFilterChange: (data) => dispatch(filterData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);
