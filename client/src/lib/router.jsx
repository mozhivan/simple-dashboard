import { FlowRouter } from 'meteor/kadira:flow-router';
import React from 'react';
import { mount } from 'react-mounter';
import { dispatch } from './store';
import { pageChanged } from '../pages/common/actions/commonActions';
import MainLayout from './layout';
import WebsitesPage from '../pages/websites';
import ArticlesPage from '../pages/articles';

FlowRouter.route('/', {
  triggersEnter: [
    (context, redirect) => {
      redirect('/websites');
    },
  ],
  action () {
    mount(MainLayout);
  },
});

FlowRouter.route('/websites', {
  action () {
    mount(MainLayout, {
      content: <WebsitesPage />,
    });
    dispatch(pageChanged('Websites'));
  },
});

FlowRouter.route('/articles', {
  action () {
    mount(MainLayout, {
      content: <ArticlesPage />,
    });
    dispatch(pageChanged('Articles'));
  },
});
