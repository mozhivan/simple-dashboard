/**
  * @fileOverview Contains sequelize model for articles
*/
import { Model } from 'sequelize';

/**
 * @name {Authors}
 */
class Authors extends Model {
  /**
   * Method, that handles associations
   * @method
   * @param  {Object} models Object, containing all models
   */
  static associate () {
  }

  /**
   * Method, that do model initialization
   * @method
   * @param  {Object} sequelize Sequelize database instance
   * @param  {Object} DataTypes Sequelize object, containing all datatypes
   */
  static init (sequelize, DataTypes) {
    return super.init(
      {
        /**
        * Id of the author
        * Primary key
        * @type {!integer}
        */
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          validate: {
            isInt: {
              msg: 'Id must be integer',
            },
          },
        },
        /**
        * Author's name
        * @type {string}
        */
        name: {
          type: DataTypes.STRING,
          field: 'name',
        },
        /**
        * Author's email
        * @type {string}
        */
        email: {
          type: DataTypes.STRING,
          field: 'email',
        },
        /**
        * Age of author
        * @type {!integer}
        */
        age: {
          type: DataTypes.INTEGER,
          field: 'age',
          validate: {
            isInt: {
              msg: 'Age must be integer',
            },
          },
        },
        /**
        * Author's country
        * @type {string}
        */
        country: { type: DataTypes.STRING },
      },
      {
        modelName: 'Authors',
        tableName: 'authors',
        timestamps: true,
        underscored: true,
        sequelize,
      }
    );
  }
}

export default Authors;
