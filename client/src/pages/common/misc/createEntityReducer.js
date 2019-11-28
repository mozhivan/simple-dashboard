const createEntityReducer = (
  types,
  initialState
) => (state = initialState(), action) => {
  const {
    REQUEST_ENTITY,
    RECEIVE_ENTITY,
    SORT_ENTITY,
    UPDATE_ENTITY,
    DELETE_ENTITY,
    CHANGE_FILTER,
    CHANGE_FILTER_VALUE,
  } = types;
  const {
    rows,
    sorting,
    filter,
    filterValue,
  } = action;

  switch (action.type) {
    case REQUEST_ENTITY:
      return {
        ...state,
        isFetching: true,
      };

    case RECEIVE_ENTITY:
      return {
        ...state,
        isFetching: false,
        needFetching: false,
        rows,
      };

    case UPDATE_ENTITY:
      return {
        ...state,
        rows,
      };

    case DELETE_ENTITY:
      return {
        ...state,
        selected: [],
        rows,
      };

    case SORT_ENTITY:
      return {
        ...state,
        sorting,
      };

    case CHANGE_FILTER:
      return {
        ...state,
        filter,
      };

    case CHANGE_FILTER_VALUE:
      return {
        ...state,
        filterValue,
      };

    default:
      return state;
  }
};

export default createEntityReducer;
