/**
  * @fileOverview Contains sequelize model for articles
*/
import { Model } from 'sequelize';

/**
 * @name {Articles}
 */
class Articles extends Model {
  /**
   * Method, that handles associations
   * @method
   * @param  {Object} models Object, containing all models
   */
  static associate ({ Websites, Authors, ArticleWebsite }) {
    this.belongsToMany(Websites, {
      as: { singular: 'website', plural: 'websites' },
      through: { model: ArticleWebsite },
    });
    this.belongsTo(Authors, { as: 'author' });
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
        * Id of the article
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
        * Title for article
        * @type {string}
        */
        title: {
          type: DataTypes.STRING,
          field: 'title',
        },
        /**
        * Article text
        * @type {string}
        */
        text: {
          type: DataTypes.STRING(500),
          field: 'text',
        },
        /**
        * Date of arcicle publication
        * @type {Date}
        */
        publicationDate: {
          type: DataTypes.DATE,
          field: 'publication_date',
        },
      },
      {
        modelName: 'Articles',
        tableName: 'articles',
        timestamps: true,
        underscored: true,
        sequelize,
      }
    );
  }
}

export default Articles;
