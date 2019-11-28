/**
  * @fileOverview Contains sequelize model for ArticleWebsite
*/
import { Model } from 'sequelize';

/**
 * @name {ArticleWebsite}
 */
class ArticleWebsite extends Model {
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
      },
      {
        modelName: 'ArticleWebsite',
        tableName: 'article_website',
        timestamps: true,
        underscored: true,
        sequelize,
      }
    );
  }
}

export default ArticleWebsite;
