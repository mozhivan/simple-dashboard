import Timer from 'tiny-timer';
import { Meteor } from 'meteor/meteor';

export const SELECT_ROWS = 'SELECT_ROWS';
export const STATUS_MESSAGE = 'STATUS_MESSAGE';
export const SET_STICKYMODE = 'SET_STICKYMODE';
export const TOGGLE_EDITMODE = 'TOGGLE_EDITMODE';
export const RECEIVE_AUTHORS = 'RECEIVE_AUTHORS';
export const NEW_RECORD_POPUP = 'NEW_RECORD_POPUP';
export const CHANGE_GRID_PAGE = 'CHANGE_GRID_PAGE';
export const TOGGLE_PROCESSIG = 'TOGGLE_PROCESSIG';
export const STATUS_VISIBILITY = 'STATUS_VISIBILITY';
export const CHANGE_ACTIVE_PAGE = 'CHANGE_ACTIVE_PAGE';

const timer = new Timer();

const changeStatusVisibility = (status) => ({
  type: STATUS_VISIBILITY,
  status,
});

const changeMessage = (message) => ({
  type: STATUS_MESSAGE,
  message,
});

export const status = (message, visible = true) => (dispatch) => {
  dispatch(changeMessage(message));
  dispatch(changeStatusVisibility(visible));

  if (message && visible) {
    const duration = 2400;
    const interval = 2000;

    timer.stop();
    timer.removeAllListeners();
    timer.on('tick', () => {
      if (timer.time < interval) {
        dispatch(changeStatusVisibility(false));
      }
    });
    timer.on('done', () => {
      dispatch(changeMessage(''));
    });
    timer.start(duration, interval);
  }
};

const setEditMode = (editMode) => ({
  type: TOGGLE_EDITMODE,
  editMode,
});

export const toggleEditMode = () => (dispatch, getState) => {
  const { common: { editMode } } = getState();
  dispatch(setEditMode(!editMode));
};

const changeActivePage = (page) => ({
  type: CHANGE_ACTIVE_PAGE,
  activePage: page,
});

export const pageChanged = (page) => (dispatch, getState) => {
  const { common: { activePage } } = getState();
  if (page !== activePage) {
    dispatch(changeActivePage(page));
  }
};

const changeGridPage = (currentPage) => ({
  type: CHANGE_GRID_PAGE,
  currentPage,
});

export const gridPageChanged = (number, pages = 0) => (dispatch, getState) => {
  const { common: { currentPage } } = getState();
  let page;
  page = number > pages ? pages : number;
  page = page < 1 ? 1 : page;
  page = pages === 0 ? number : page;
  if (currentPage !== page) {
    dispatch(changeGridPage(page));
  }
};

const createRecordPopup = (createRecordPopup) => ({
  type: NEW_RECORD_POPUP,
  createRecordPopup,
});

export const showCreateRecordPopup = (show) => (dispatch) => {
  dispatch(createRecordPopup(show));
};

const setProcessing = (processing) => ({
  type: TOGGLE_PROCESSIG,
  processing,
});


export const processing = (processing) => (dispatch) => {
  dispatch(setProcessing(processing));
};

const setSticky = (stickyMode) => ({
  type: SET_STICKYMODE,
  stickyMode,
});

export const checkHeaderOffset = (offset) => (dispatch, getState) => {
  const { common: { stickyMode } } = getState();
  if (!stickyMode && offset < 0) {
    dispatch(setSticky(true));
  }
  if (stickyMode && offset > 0) {
    dispatch(setSticky(false));
  }
};

export const rowsSelected = (selected) => ({
  type: SELECT_ROWS,
  selected,
});

export const receiveAuthors = (authors) => ({
  type: RECEIVE_AUTHORS,
  authors,
});

export const fetchAuthors = () => (dispatch) => Meteor.call('AuthorsActions.findAll', [], function (error, result) {
  if (error) {
    throw new Meteor.Error(500, error.message);
  }

  const { rows } = result;
  dispatch(receiveAuthors(rows));

});
