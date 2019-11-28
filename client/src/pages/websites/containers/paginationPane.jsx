import { connect } from 'react-redux';
import { gridPageChanged } from '../../common/actions/commonActions';
import PaginationPane from '../../common/components/paginationPane';

const mapStateToProps = (state) => {
  const {
    currentPage,
    rowsPerPage,
  } = state.common;
  const {
    rows = [],
  } = state.websites;

  return {
    currentPage,
    pages: Math.ceil(rows.length / rowsPerPage),
  };
};

const mapDispatchToProps = (dispatch) => ({
  onPrevClick: (page, pages) => dispatch(gridPageChanged(page - 1, pages)),
  onNextClick: (page, pages) => dispatch(gridPageChanged(page + 1, pages)),
  selectPage: (page) => dispatch(gridPageChanged(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaginationPane);
