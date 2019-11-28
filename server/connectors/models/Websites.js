/**
  * @fileOverview Contains sequelize model for websites
*/
import { Model } from 'sequelize';

/**
 * @name {Websites}
 */
class Websites extends Model {
  /**
   * Method, that handles associations
   * @method
   * @param  {Object} models Object, containing all models
   */
  static associate ({ Articles, ArticleWebsite }) {
    this.belongsToMany(Articles, {
      through: { model: ArticleWebsite },
    });
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
        * Id of the website
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
        * Title for website
        * @type {string}
        */
        title: {
          type: DataTypes.STRING,
          field: 'title',
        },
        /**
        * Website description
        * @type {string}
        */
        description: {
          type: DataTypes.STRING,
          field: 'description',
        },
        /**
        * Website URL
        * @type {string}
        */
        url: {
          type: DataTypes.STRING,
          field: 'url',
        },
        /**
        * Amount of website visitors
        * @type {integer}
        */
        visitorsCount: {
          type: DataTypes.INTEGER,
          field: 'visitors_count',
        },
      },
      {
        modelName: 'Websites',
        tableName: 'websites',
        timestamps: true,
        underscored: true,
        sequelize,
      }
    );
  }
}

export default Websites;
