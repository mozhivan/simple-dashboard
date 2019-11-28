import { connect } from 'react-redux';
import { toggleEditMode, showCreateRecordPopup } from '../../common/actions/commonActions';
import { deleteWebsites } from '../actions/websitesActions';
import HeaderButtons from '../../common/components/headerButtons';

const mapStateToProps = (state) => {
  const {
    editMode,
    processing,
    createRecordPopup,
  } = state.common;
  const shouldProcessing = !createRecordPopup;

  return {
    editMode,
    processing: shouldProcessing && processing,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onNewClick: () => dispatch(showCreateRecordPopup(true)),
  onEditClick: () => dispatch(toggleEditMode()),
  onDeleteClick: () => dispatch(deleteWebsites()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderButtons);
