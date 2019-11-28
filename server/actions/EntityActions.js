/**
 * @fileOverview Contains class with CRUD methods for Entity
 * @name {EntityActions}
 */
class EntityActions {
  constructor (Entity) {
    this.Entity = Entity;
  }

  /**
   * Method, that create entity
   * @method
   * @this {EntityActions}
   * @param  {Object} args Parameters of create
   * @return {Promise} Promise of created entity
   */
  create (...args) {
    return this.Entity.create(...args)
      .then((result) => result.get({ plain: true }));
  }

  /**
   * Method, that fetch all Entity
   * @method
   * @this {EntityActions}
   * @param {Array} attributes Array of attributes for query
   * @param {Array} order Sort parameters
   * @return {Promise} Promise of records count and rows data
   */
  findAll (attributes = null, order = [[ 'id', 'DESC' ]]) {
    return this.Entity.findAndCountAll({
      attributes,
      order,
      raw: true,
    });
  }

  /**
   * Method, that find entity by Id
   * @method
   * @this {EntityActions}
   * @param  {number} id entity Id
   * @return {Promise} Promise of results
   */
  find (id) {
    return this.Entity.findAll({
      where: { id },
      raw: true,
    });
  }

  /**
   * Method, that filter entities
   * @method
   * @this {EntityActions}
   * @param  {Object} args Filter parameters
   * @return {Promise} Promise of results
   */
  filter (...args) {
    return this.Entity.findAll(...args);
  }

  /**
   * Method, that update entity
   * @method
   * @this {EntityActions}
   * @param  {Object} args Update parameters
   * @return {Promise} Promise with count of updated rows
   */
  update (...args) {
    return this.Entity.update(...args);
  }

  /**
   * Method, that delete entity
   * @method
   * @param  {number} id entity Id
   * @return {Promise} Promise with count of deleted rows
   */
  delete (...args) {
    return this.Entity.destroy(...args);
  }
}

export default EntityActions;
