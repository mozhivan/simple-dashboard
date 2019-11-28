import { connect } from 'react-redux';
import {
  fetchWebsitesIfNeeded,
  sortWebsites,
  updateWebsite,
} from '../actions/websitesActions';
import GridContainer from '../../common/containers/grid';

const mapStateToProps = (state) => {
  const {
    rows,
    sorting,
    isFetching,
    needFetching,
    headerProps,
    filter,
    filterValue,
  } = state.websites;
  const {
    authors,
  } = state.common;

  return {
    rows,
    authors,
    sorting,
    isFetching,
    needFetching,
    headerProps,
    filter,
    filterValue,
  };
};

const mapDispatchToProps = (dispatch) => ({
  update: (id, field, value) => dispatch(updateWebsite(id, field, value)),
  sortByField: (field) => dispatch(sortWebsites(field)),
  fetchData: () => dispatch(fetchWebsitesIfNeeded()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GridContainer);
