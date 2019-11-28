import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import store from './store';

const MainLayout = ({ content }) => (
  <div
    id="main"
    className="mainLayout"
  >
    <Provider store={store}>
      { content }
    </Provider>
  </div>
);

MainLayout.propTypes = {
  content: PropTypes.element.isRequired,
};

export default MainLayout;
