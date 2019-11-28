import { connect } from 'react-redux';
import HeaderStatus from '../components/headerStatus';

const mapStateToProps = (state) => {
  const {
    message,
    status,
  } = state.common;
  return {
    message,
    visible: status,
  };
};

export default connect(mapStateToProps, null)(HeaderStatus);
