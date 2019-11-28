/**
 * @fileOverview Contains class with CRUD methods for articles
 */
import { Meteor } from 'meteor/meteor';
import { models } from '../connectors';
import EntityActions from './EntityActions';

const { Articles } = models;
/**
 * @name {ArticlesActions}
 */
class ArticlesActions extends EntityActions {
  /**
   * Method, that create article
   * @method
   * @override
   * @param  {Object} args Parameters of create
   * @return {Promise} Promise with created article
   */
  create (args) {
    const { author, ...params } = args;
    return super.create({
      publicationDate: new Date(),
      authorId: author,
      ...params,
    });
  }

  /**
   * Method, that find all Articles
   * @method
   * @override
   * @this {ArticlesActions}
   * @return {Promise} Promise with results
   */
  findAll () {
    return super.findAll([ 'id', 'title', 'text', 'publicationDate', 'authorId' ]);
  }
}

const articlesActions = new ArticlesActions(Articles);

const ACTIONS = {
  'ArticlesActions.create': (args) => articlesActions.create(args),
  'ArticlesActions.findAll': () => articlesActions.findAll(),
  'ArticlesActions.find': (id) => articlesActions.find(id),
  'ArticlesActions.update': (...args) => articlesActions.update(...args),
  'ArticlesActions.delete': (...args) => articlesActions.delete(...args),
};

Meteor.methods(ACTIONS);

export default articlesActions;
