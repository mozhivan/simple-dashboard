/**
  * @fileOverview Contains class with CRUD methods for Websites
*/
import { Meteor } from 'meteor/meteor';
import { models } from '../connectors';
import EntityActions from './EntityActions';

const { Websites } = models;
/**
 * @name {WebsitesActions}
 */
class WebsitesActions extends EntityActions {
  /**
   * Method, that find all Websites
   * @method
   * @override
   * @this {WebsitesActions}
   * @return {Promise} Promise of results
   */
  findAll () {
    return super.findAll([
      'id',
      'title',
      'url',
      'description',
      'visitorsCount',
    ]);
  }
}

const websitesActions = new WebsitesActions(Websites);

const ACTIONS = {
  'WebsitesActions.create': (args) => websitesActions.create(args),
  'WebsitesActions.findAll': () => websitesActions.findAll(),
  'WebsitesActions.find': (id) => websitesActions.find(id),
  'WebsitesActions.update': (...args) => websitesActions.update(...args),
  'WebsitesActions.delete': (...args) => websitesActions.delete(...args),
};

Meteor.methods(ACTIONS);

export default websitesActions;
