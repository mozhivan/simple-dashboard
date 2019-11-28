import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GridCellSelect from '../components/gridCellSelect';
import { fetchAuthors } from '../actions/commonActions';

class AuthorsSelect extends Component {
  constructor (props) {
    super(props);
    this.handleSelectInput = this.handleSelectInput.bind(this);
  }

  componentDidMount () {
    const {
      authors,
      fetch,
    } = this.props;

    if (!authors) {
      fetch();
    }
  }

  handleSelectInput (value) {
    this.selectInput = value;
    this.forceUpdate();
  }

  render () {
    const {
      authors = [],
    } = this.props;

    return (
      <GridCellSelect
        readOnly={false}
        value={this.selectInput}
        options={authors}
        onChange={(event) => this.handleSelectInput(event.target.value)}
      />
    );
  }
}

AuthorsSelect.propTypes = {
  authors: PropTypes.array,
  fetch: PropTypes.func,
};

const mapStateToProps = (state) => {
  const {
    authors,
  } = state.common;
  return {
    authors,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetch: () => dispatch(fetchAuthors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsSelect);
