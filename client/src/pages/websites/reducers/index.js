import { websites } from '../../common/misc/entityConstants';
import createEntityReducer from '../../common/misc/createEntityReducer';

const {
  initialState,
  types,
} = websites;

export default createEntityReducer(
  types,
  initialState
);
