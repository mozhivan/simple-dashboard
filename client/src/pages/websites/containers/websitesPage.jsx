import React from 'react';
import Header from '../../common/components/header';
import WebsiteGrid from './websiteGrid';
import SearchPanel from './searchPanel';
import HeaderButtons from './headerButtons';
import PaginationPane from './paginationPane';
import CreateRecordPopup from './createRecordPopup';

const WebsitesPage = () => (
  <div>
    <CreateRecordPopup />
    <Header
      search={<SearchPanel />}
      controls={<HeaderButtons />}
    />
    <WebsiteGrid />
    <PaginationPane />
  </div>
);

export default WebsitesPage;
