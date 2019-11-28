import { articles } from '../../common/misc/entityConstants';
import createEntityReducer from '../../common/misc/createEntityReducer';

const {
  initialState,
  types,
} = articles;

export default createEntityReducer(
  types,
  initialState
);
