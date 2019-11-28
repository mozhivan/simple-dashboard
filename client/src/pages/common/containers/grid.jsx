import _ from 'lodash';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'auto-bind';
import Grid from '../components/grid';
import GridRow from '../components/gridRow';
import GridHeader from '../components/gridHeader';
import GridCell from '../components/gridCell';
import GridCellInput from '../components/gridCellInput';
import GridCellSelect from '../components/gridCellSelect';
import GridCellTextarea from '../components/gridCellTextarea';
import { formatIfDate } from '../../../../../imports/api/lib/format';
import { filterRows, filterByAuthor } from '../../../../../imports/api/lib/filters';
import { checkHeaderOffset, rowsSelected } from '../actions/commonActions';

class GridContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      editedCell: '',
      cellInput: '',
    };
    autoBind.react(this);
  }

  componentDidMount () {
    const { fetchData } = this.props;
    window.addEventListener('scroll', this.onScroll);
    fetchData();
  }

  componentDidUpdate (prevProps) {
    const {
      rows = [],
      needFetching,
      fetchData,
    } = this.props;
    const prevRaws = prevProps.rows;
    if (rows !== prevRaws && needFetching) {
      fetchData();
    }
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll () {
    if (this.headerRef) {
      const { onPageScroll } = this.props;
      const headerOffset = this.headerRef.getBoundingClientRect().top;
      if (!this.initialOffset) {
        this.initialOffset = headerOffset;
      }
      const offset = this.initialOffset - window.pageYOffset;

      onPageScroll(offset);
    }
  }

  getRows () {
    const {
      rows = [],
      filter,
      authors,
      selected,
      filterValue,
      rowsPerPage,
      currentPage,
    } = this.props;
    const filteredRows = filter === 'authorId'
      ? filterByAuthor(filterValue, rows, authors)
      : filterRows(filter, filterValue, rows);
    const gridRows = filteredRows.map((row = {}) => {
      const number = _.indexOf(rows, row) + 1;
      const cells = this.createCells(row, number);
      const selectedRow = _.indexOf(selected, row.id) >= 0;

      return (
        <GridRow
          key={row.id}
          cells={cells}
          selected={selectedRow}
        />
      );
    });
    const chunkedRows = _.chunk(gridRows, rowsPerPage)[currentPage - 1];

    return chunkedRows;
  }

  setHeaderRef (node) {
    this.headerRef = node;
  }

  getHeader () {
    const {
      headerProps,
      sortByField,
      // stickyMode,
      sorting,
    } = this.props;

    return (
      <GridHeader
        headerProps={headerProps}
        onHeaderClick={sortByField}
        sorting={sorting}
        // TODO: fix blinking header
        // sticky={stickyMode}
        headerRef={this.setHeaderRef}
      />
    );
  }

  handleCellInput (target, field, editedRow) {
    const { value, checked } = target;
    const editedCell = editedRow + field;
    let cellInput = value;

    if (field === 'checkbox') {
      const { updateSelected, selected } = this.props;
      const ckeckedRows = checked
        ? [ ...selected, editedRow ]
        : [ ...selected ].filter((row) => row !== editedRow);
      updateSelected(ckeckedRows);
    }
    if (field === 'authorId') {
      const { authors } = this.props;
      const [ author ] = authors.filter((o) => o.name === value);
      cellInput = author.id;
    }

    this.setState({
      cellInput,
      editedCell,
      editedRow,
    });
  }

  handleUpdate (field, value) {
    const {
      cellInput,
      editedRow,
    } = this.state;
    const { update } = this.props;

    return this.needUpdate(field, value) && update(editedRow, field, cellInput);
  }

  handleSelection (event) {
    const { editMode } = this.props;

    return !editMode && event.preventDefault();
  }

  handleKeyPressed (keyCode, field, value) {
    return keyCode === 13 && this.handleUpdate(field, value);
  }

  needUpdate (field, value) {
    const {
      cellInput,
    } = this.state;
    const {
      editMode,
    } = this.props;
    const needUpdate = (
      editMode
      && field !== 'checkbox'
      && cellInput
    );
    if (needUpdate) {
      return cellInput.toString().trim() !== formatIfDate(value).toString();
    }
  }

  createCells (table, number) {
    const {
      headerProps,
      editMode,
      authors,
    } = this.props;
    const createCell = (cell) => {
      const { id } = table;
      const {
        name,
        editable,
        inputType,
      } = cell;
      const cellId = id + name;
      const editedRow = id;
      const {
        editedCell,
        cellInput,
      } = this.state;
      const value = name === 'number' ? number : table[name];
      const readOnly = (editable && !editMode) || !editable;
      let cellValue = editedCell === cellId ? cellInput : value;
      if (value instanceof Date) {
        cellValue = formatIfDate(cellValue);
      }

      let input;
      switch (name) {
        case 'authorId':
          {
            const [ author ] = authors.filter((o) => o.id === Number(cellValue));
            let lookupValue = '';
            if (author) {
              lookupValue = author.name;
            }
            input = (
              <GridCellSelect
                readOnly={readOnly}
                value={lookupValue}
                options={authors}
                onFocus={(event) => this.handleCellInput(event.target, name, editedRow)}
                onChange={(event) => this.handleCellInput(event.target, name, editedRow)}
                onBlur={() => this.handleUpdate(name, value)}
              />
            );
          }
          break;
        case 'text':
          {
            const currentCell = editedRow + name;
            const expanded = editMode && editedCell === currentCell;
            input = (
              <GridCellTextarea
                expanded={expanded}
                value={cellValue}
                readOnly={readOnly}
                onSelection={(event) => this.handleSelection(event)}
                onChange={(event) => this.handleCellInput(event.target, name, editedRow)}
                onFocus={(event) => name !== 'checkbox' && this.handleCellInput(event.target, name, editedRow)}
                onBlur={() => this.handleUpdate(name, value)}
                onKeyPressed={({ keyCode }) => this.handleKeyPressed(keyCode, name, value)}
              />
            );
          }
          break;
        default:
          input = (
            <GridCellInput
              type={inputType}
              value={cellValue}
              readOnly={readOnly}
              onSelection={(event) => this.handleSelection(event)}
              onChange={(event) => this.handleCellInput(event.target, name, editedRow)}
              onFocus={(event) => name !== 'checkbox' && this.handleCellInput(event.target, name, editedRow)}
              onBlur={() => this.handleUpdate(name, value)}
              onKeyPressed={({ keyCode }) => this.handleKeyPressed(keyCode, name, value)}
            />
          );
      }

      return (
        <GridCell
          key={id + name}
          input={input}
          field={name}
        />
      );
    };

    return headerProps
      .map(createCell);
  }

  render () {
    const { editMode } = this.props;
    return (
      <Grid
        disabled={!editMode}
        gridHeader={this.getHeader()}
        gridRows={this.getRows()}
      />
    );
  }
}

GridContainer.propTypes = {
  rows: PropTypes.array,
  authors: PropTypes.array,
  filter: PropTypes.string,
  sorting: PropTypes.array,
  selected: PropTypes.array,
  filterValue: PropTypes.string,
  editMode: PropTypes.bool,
  // stickyMode: PropTypes.bool,
  needFetching: PropTypes.bool,
  headerProps: PropTypes.array,
  sortByField: PropTypes.func,
  fetchData: PropTypes.func,
  update: PropTypes.func,
  updateSelected: PropTypes.func,
  onPageScroll: PropTypes.func,
  rowsPerPage: PropTypes.number,
  currentPage: PropTypes.number,
};

const mapStateToProps = (state) => {
  const {
    selected,
    rowsPerPage,
    currentPage,
    stickyMode,
    editMode,
  } = state.common;
  return {
    editMode,
    stickyMode,
    currentPage,
    rowsPerPage,
    selected,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onPageScroll: (offset) => dispatch(checkHeaderOffset(offset)),
  updateSelected: (selected) => dispatch(rowsSelected(selected)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GridContainer);
