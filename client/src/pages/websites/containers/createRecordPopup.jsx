import { connect } from 'react-redux';
import CreateRecordPopup from '../../common/components/createRecordPopup';
import { showCreateRecordPopup } from '../../common/actions/commonActions';
import { createWebsite } from '../actions/websitesActions';

const mapStateToProps = (state) => {
  const {
    headerProps,
  } = state.websites;
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
  onClose: () => dispatch(showCreateRecordPopup(false)),
  onSumbit: async (event) => {
    event.preventDefault();
    const {
      url,
      title,
      description,
    } = event.target.elements;

    dispatch(createWebsite({
      description: description.value,
      visitorsCount: 0,
      title: title.value,
      url: url.value,
    }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateRecordPopup);
