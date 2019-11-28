import _ from 'lodash';
import autoBind from 'auto-bind';
import { Meteor } from 'meteor/meteor';
import {
  status,
  processing,
  fetchAuthors,
  rowsSelected,
  showCreateRecordPopup,
} from '../actions/commonActions';
import { formatToDate } from '../../../../../imports/api/lib/format';
import callWithPromise from '../../../../../imports/api/lib/callWithPromise';

class EntityActions {
  constructor (entity) {
    this.entity = entity;
    autoBind(this);
  }

  requestEntity () {
    const type = this.entity.types.REQUEST_ENTITY;
    return {
      type,
      isFetching: true,
    };
  }

  receiveEntity (rows) {
    const type = this.entity.types.RECEIVE_ENTITY;
    return {
      type,
      isFetching: false,
      rows,
    };
  }

  changeSortOrder (field, order) {
    const type = this.entity.types.SORT_ENTITY;
    return {
      type,
      sorting: [
        field,
        order,
      ],
    };
  }

  entityUpdated (id, field, value, rows) {
    const type = this.entity.types.UPDATE_ENTITY;
    return {
      type,
      id,
      field,
      value,
      rows,
    };
  }

  entityDeleted (rows) {
    const type = this.entity.types.DELETE_ENTITY;
    return {
      type,
      rows,
    };
  }

  applyFilter (filter) {
    const type = this.entity.types.CHANGE_FILTER;
    return {
      type,
      filter,
    };
  }

  filterData (filterValue) {
    const type = this.entity.types.CHANGE_FILTER_VALUE;
    return {
      type,
      filterValue,
    };
  }

  getSortOrder = (field, state, changeOrder) => {
    const { name } = this.entity;
    const { [name]: { sorting } } = state;
    const [ prevField, prevOrder ] = sorting;
    const inverseOrder = prevOrder === 'DESC' ? 'ASC' : 'DESC';
    const order = changeOrder ? inverseOrder : prevOrder;
    const defaultOrder = 'ACS';

    return prevField === field ? order : defaultOrder;
  }

  sortEntity (field, changeOrder = true) {
    const { name } = this.entity;

    return (dispatch, getState) => {
      const state = getState();
      const { [name]: { rows } } = state;
      const order = this.getSortOrder(field, state, changeOrder);
      const orderValue = order.toLowerCase();
      const sortedRows = _.orderBy(rows, [ field ], [ orderValue ]);
      dispatch(this.receiveEntity(sortedRows));

      return dispatch(this.changeSortOrder(field, order));
    };
  }

  updateEntity (id, field, cellValue) {
    const { name, methods: { update } } = this.entity;
    return (dispatch, getState) => {
      let value;

      switch (field) {
        case 'authorId':
          value = Number(cellValue);
          break;
        case 'publicationDate':
          value = formatToDate(cellValue);
          break;
        default:
          value = cellValue.trim();
      }
      const args = [
        {
          [field]: value,
        },
        {
          where: { id },
        },
      ];

      const cb = (error, result = []) => {
        if (error) {
          throw new Meteor.Error(500, error.message);
        }

        const [ count ] = result;
        if (count === 1) {
          const state = getState();
          const { [name]: { rows } } = state;
          const index = _.findIndex(rows, (el) => el.id === id);
          const updatedRow = {
            ...rows[index],
            [field]: value,
          };
          const rowsUpdated = [
            ...rows.slice(0, index),
            updatedRow,
            ...rows.slice(index + 1),
          ];

          dispatch(this.entityUpdated(id, field, value, rowsUpdated));
          dispatch(status(`${field} updated`));
        }
      };

      return Meteor.call(update, ...args, cb);
    };
  }

  fetchEntity (message = true) {
    const { name, methods: { findAll } } = this.entity;

    return (dispatch, getState) => {
      const { [name]: { sorting } } = getState();
      const [ field ] = sorting;
      dispatch(this.requestEntity());
      dispatch(fetchAuthors());
      if (message) {
        dispatch(status('Loading..'));
      }
      const cb = (error, result) => {
        if (error) {
          throw new Meteor.Error(500, error.message);
        }

        const { rows } = result;
        dispatch(this.receiveEntity(rows));
        dispatch(this.sortEntity(field, false));

        if (message === 'Loading..') {
          dispatch(status(''));
        }
      };

      return Meteor.call(findAll, [], cb);
    };
  }

  shouldFetchEntity (state) {
    const { name } = this.entity;
    const { [name]: { rows, isFetching, needFetching } } = state;
    if (!rows) {
      return true;
    } else if (isFetching) {
      return false;
    }
    return needFetching;
  }

  fetchEntityIfNeeded () {
    return (dispatch, getState) => {
      if (this.shouldFetchEntity(getState())) {
        return dispatch(this.fetchEntity());
      }
    };
  }

  deleteEntity () {
    const { name, methods: { deleteMany } } = this.entity;

    return (dispatch, getState) => {
      const {
        [name]: { rows },
        common: { selected },
      } = getState();
      const args = [
        {
          where: { id: selected },
        },
      ];

      if (selected.length === 0 || !selected) {
        return;
      }
      dispatch(processing(true));
      const cb = (error, result = 0) => {
        dispatch(processing(false));

        if (result === selected.length) {
          dispatch(this.entityDeleted(rows.filter((row) => !_.includes(selected, row.id))));
        }

        if (result > 0) {
          dispatch(this.fetchEntity(false));
          dispatch(status(`${result} record(s) deleted`));
          dispatch(rowsSelected([]));
        }

      };

      try {
        return Meteor.call(deleteMany, ...args, cb);
      } catch (error) {
        dispatch(processing(false));
        throw new Meteor.Error(500, error.message);
      }
    };
  }

  createEntity (args) {
    const { name, methods: { create } } = this.entity;

    return (dispatch, getState) => {
      const { [name]: { rows } } = getState();
      dispatch(processing(true));

      return callWithPromise(create, args)
        .then((result) => {
          dispatch(processing(false));

          if (result.id) {
            dispatch(this.receiveEntity([ result, ...rows ]));
            dispatch(status(`"${result.title}" ${name} created`));
          }
        })
        .catch((error) => {
          throw new Meteor.Error(500, error.message);
        })
        .finally(() => dispatch(showCreateRecordPopup(false)));
    };
  }
}

export default EntityActions;
