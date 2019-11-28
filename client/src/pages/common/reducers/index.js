import {
  TOGGLE_EDITMODE,
  CHANGE_ACTIVE_PAGE,
  STATUS_MESSAGE,
  STATUS_VISIBILITY,
  CHANGE_GRID_PAGE,
  NEW_RECORD_POPUP,
  TOGGLE_PROCESSIG,
  SET_STICKYMODE,
  RECEIVE_AUTHORS,
  SELECT_ROWS,
} from '../actions/commonActions';

const initialState = () => ({
  currentPage: 1,
  rowsPerPage: 10,
  message: '',
  selected: [],
  editMode: false,
  activePage: 'Websites',
  pageOptions: [
    {
      label: 'Websites',
      ref: 'websites',
    },
    {
      label: 'Articles',
      ref: 'articles',
    },
  ],
});

const common = (state = initialState(), action) => {
  const {
    type,
    status,
    authors,
    message,
    selected,
    editMode,
    stickyMode,
    processing,
    activePage,
    currentPage,
    createRecordPopup,
  } = action;

  switch (type) {
    case TOGGLE_EDITMODE:
      return {
        ...state,
        editMode,
      };

    case CHANGE_ACTIVE_PAGE:
      return {
        ...state,
        activePage,
        currentPage: 1,
        message: '',
      };

    case STATUS_MESSAGE:
      return {
        ...state,
        message,
      };

    case STATUS_VISIBILITY:
      return {
        ...state,
        status,
      };

    case CHANGE_GRID_PAGE:
      return {
        ...state,
        currentPage,
      };

    case NEW_RECORD_POPUP:
      return {
        ...state,
        createRecordPopup,
      };

    case TOGGLE_PROCESSIG:
      return {
        ...state,
        processing,
      };

    case SET_STICKYMODE:
      return {
        ...state,
        stickyMode,
      };

    case SELECT_ROWS:
      return {
        ...state,
        selected,
      };

    case RECEIVE_AUTHORS:
      return {
        ...state,
        authors,
      };

    default:
      return state;
  }
};

export default common;
