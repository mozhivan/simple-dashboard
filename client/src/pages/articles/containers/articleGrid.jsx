import { connect } from 'react-redux';
import {
  fetchArticlesIfNeeded,
  sortArticles,
  updateArticle,
} from '../actions/articlesActions';
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
  } = state.articles;
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
  update: (id, field, value) => dispatch(updateArticle(id, field, value)),
  sortByField: (field) => dispatch(sortArticles(field)),
  fetchData: () => dispatch(fetchArticlesIfNeeded()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GridContainer);
