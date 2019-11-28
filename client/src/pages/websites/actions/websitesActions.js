import EntityActions from '../../common/misc/entityActions';
import { websites } from '../../common/misc/entityConstants';

const actions = new EntityActions(websites);

export const sortWebsites = (field, changeOrder) => actions.sortEntity(field, changeOrder);
export const updateWebsite = (id, field, cellValue) => actions.updateEntity(id, field, cellValue);
export const fetchWebsitesIfNeeded = () => actions.fetchEntityIfNeeded();
export const deleteWebsites = () => actions.deleteEntity();
export const createWebsite = (args) => actions.createEntity(args);
export const applyFilter = (filter) => actions.applyFilter(filter);
export const filterData = (filterValue) => actions.filterData(filterValue);
