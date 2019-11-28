import EntityActions from '../../common/misc/entityActions';
import { articles } from '../../common/misc/entityConstants';

const actions = new EntityActions(articles);

export const sortArticles = (field, changeOrder) => actions.sortEntity(field, changeOrder);
export const updateArticle = (id, field, cellValue) => actions.updateEntity(id, field, cellValue);
export const fetchArticlesIfNeeded = () => actions.fetchEntityIfNeeded();
export const deleteArticles = () => actions.deleteEntity();
export const createArticle = (args) => actions.createEntity(args);
export const applyFilter = (filter) => actions.applyFilter(filter);
export const filterData = (filterValue) => actions.filterData(filterValue);
