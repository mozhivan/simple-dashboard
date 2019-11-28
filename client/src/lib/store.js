import {
  combineReducers,
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import articles from '../pages/articles/reducers';
import websites from '../pages/websites/reducers';
import common from '../pages/common/reducers';

const rootReducer = combineReducers({
  articles,
  websites,
  common,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, promiseMiddleware))
);

export const { dispatch } = store;

export default store;
