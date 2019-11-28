/**
  * @fileOverview Contains routes for articles
*/
import { Meteor } from 'meteor/meteor';
import { Picker } from 'meteor/meteorhacks:picker';
import articlesActions from '../actions/ArticlesActions';

/**
 * @name {ArticleRoutes}
 */
class ArticleRoutes {
  /**
   * Method, that do routes initialization on server
   * @method
   * @this {ArticleRoutes}
   */
  static init () {
    Picker.route('/server/articles', function (params, request, response) {
      if (request.method === 'GET') {
        articlesActions.findAll()
          .then(({ count, rows }) => {
            if (count === 0) {
              throw new Meteor.Error(500, 'Records does not exist');
            }
            const res = {
              message: `Recieved ${count} record(s)`,
              error: false,
              data: {
                count,
                rows,
              },
            };

            response.setHeader('Content-Type', 'application/json');
            response.end(JSON.stringify(res));
          })
          .catch((error) => {
            const res = {
              error: true,
              message: error.message,
            };
            response.setHeader('Content-Type', 'application/json');
            response.end(JSON.stringify(res));
          });
      }
    });

    Picker.route('/server/articles/:id', function (params, request, response) {
      const { id } = params;

      switch (request.method) {
        case 'GET':
          articlesActions.find(id)
            .then((article) => {
              if (!article.length) {
                throw new Meteor.Error(500, 'Record does not exist');
              }
              const [ data ] = article;
              const res = {
                error: false,
                data,
              };
              response.setHeader('Content-Type', 'application/json');
              response.end(JSON.stringify(res));
            })
            .catch((error) => {
              const res = {
                error: true,
                message: error.message,
              };
              response.setHeader('Content-Type', 'application/json');
              response.end(JSON.stringify(res));
            });
          break;
        case 'DELETE':
          articlesActions.delete({
            where: { id },
          })
            .then((count) => {
              if (count !== 1) {
                throw new Meteor.Error(500, 'Record does not exist');
              }
              const res = {
                error: false,
                message: `Row deleted, id: ${id}`,
              };
              response.setHeader('Content-Type', 'application/json');
              response.end(JSON.stringify(res));
            })
            .catch((error) => {
              const res = {
                error: true,
                message: error.message,
              };
              response.setHeader('Content-Type', 'application/json');
              response.end(JSON.stringify(res));
            });
          break;
      }
    });

    Picker.route('/server/articles/:id/:author/:title/:text', function (params, request, response) {
      const {
        id,
        title,
        text,
        author,
      } = params;

      switch (request.method) {
        case 'PUT':
          articlesActions.update(
            {
              title,
              text,
            },
            {
              where: { id },
            }
          )
            .then(([ count ]) => {
              if (count !== 1) {
                throw new Meteor.Error(500, 'Record does not exist');
              }
              const res = {
                error: false,
                message: `Record updated, Id: ${id}`,
              };
              response.setHeader('Content-Type', 'application/json');
              response.end(JSON.stringify(res));
            })
            .catch((error) => {
              const res = {
                error: true,
                message: error.message,
              };
              response.setHeader('Content-Type', 'application/json');
              response.end(JSON.stringify(res));
            });
          break;
        case 'POST':
          articlesActions.create({
            title,
            text,
            author,
          })
            .then((data) => {
              const res = {
                error: false,
                data,
              };
              response.setHeader('Content-Type', 'application/json');
              response.end(JSON.stringify(res));
            })
            .catch((error) => {
              const res = {
                error: true,
                message: error.message,
              };
              response.setHeader('Content-Type', 'application/json');
              response.end(JSON.stringify(res));
            });
          break;
      }
    });
  }
}

export default ArticleRoutes;
