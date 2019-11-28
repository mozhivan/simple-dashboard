import React from 'react';
import Header from '../../common/components/header';
import ArticleGrid from './articleGrid';
import SearchPanel from './searchPanel';
import HeaderButtons from './headerButtons';
import PaginationPane from './paginationPane';
import CreateRecordPopup from './createRecordPopup';

const ArticlesPage = () => (
  <div>
    <CreateRecordPopup />
    <Header
      search={<SearchPanel />}
      controls={<HeaderButtons />}
    />
    <ArticleGrid />
    <PaginationPane />
  </div>
);

export default ArticlesPage;
