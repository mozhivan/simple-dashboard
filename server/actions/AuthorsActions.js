/**
  * @fileOverview Contains class with CRUD methods for Authors
*/
import { Meteor } from 'meteor/meteor';
import { models } from '../connectors';
import EntityActions from './EntityActions';

const { Authors } = models;
/**
 * @name {AuthorsActions}
 */
class AuthorsActions extends EntityActions {
  /**
   * Method, that find all Authors
   * @method
   * @override
   * @this {AuthorsActions}
   * @return {Promise} Promise with results
   */
  findAll () {
    return super.findAll([ 'id', 'name', 'country' ]);
  }
}

const authorsActions = new AuthorsActions(Authors);

const ACTIONS = {
  'AuthorsActions.create': (args) => authorsActions.create(args),
  'AuthorsActions.findAll': () => authorsActions.findAll(),
  'AuthorsActions.find': (id) => authorsActions.find(id),
  'AuthorsActions.update': (args) => authorsActions.update(args),
  'AuthorsActions.delete': (args) => authorsActions.delete(args),
};

Meteor.methods(ACTIONS);

export default authorsActions;
