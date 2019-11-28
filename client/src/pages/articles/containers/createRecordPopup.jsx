import { connect } from 'react-redux';
import CreateRecordPopup from '../../common/components/createRecordPopup';
import { showCreateRecordPopup } from '../../common/actions/commonActions';
import { createArticle } from '../actions/articlesActions';

const mapStateToProps = (state) => {
  const {
    headerProps,
  } = state.articles;
  const {
    authors,
    processing,
    activePage,
    createRecordPopup,
  } = state.common;
  return {
    options: headerProps.filter((prop) => prop.specifyOnCreate),
    open: createRecordPopup,
    table: activePage.toLowerCase(),
    authors,
    processing,
  };
};

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  onClose: () => dispatch(showCreateRecordPopup(false)),
});

function mergeProps (stateProps, dispatchProps, ownProps) {
  const { authors } = stateProps;
  const { dispatch } = dispatchProps;

  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    onSumbit: async (event) => {
      event.preventDefault();
      const {
        title,
        text,
        select,
      } = event.target.elements;
      const [{ id }] = authors.filter((o) => o.name === select.value);

      dispatch(createArticle({
        title: title.value,
        text: text.value,
        author: id,
      }));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CreateRecordPopup);
