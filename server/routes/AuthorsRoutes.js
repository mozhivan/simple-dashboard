/**
  * @fileOverview Contains routes for Authors
*/
import { Meteor } from 'meteor/meteor';
import { Picker } from 'meteor/meteorhacks:picker';
import authorsActions from '../actions/AuthorsActions';

/**
 * @name {AuthorRoutes}
 */
class AuthorRoutes {
  /**
   * Method, that do routes initialization on server
   * @method
   * @this {AuthorRoutes}
   */
  static init () {
    Picker.route('/server/authors', function (params, request, response) {
      if (request.method === 'GET') {
        authorsActions.findAll()
          .then(({ count, rows }) => {
            if (count === 0) {
              throw new Meteor.Error(500, 'No records returned');
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

    Picker.route('/server/authors/:id', function (params, request, response) {
      const { id } = params;

      switch (request.method) {
        case 'GET':
          authorsActions.find(id)
            .then((author) => {
              if (!author.length) {
                throw new Meteor.Error(500, 'Record does not exist');
              }
              const [ data ] = author;
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
          authorsActions.delete({
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

    Picker.route('/server/authors/:id/:name/:email/:age/:country', function (params, request, response) {
      const { id, ...args } = params;
      const {
        name,
        email,
        age,
        country,
      } = params;

      switch (request.method) {
        case 'PUT':
          authorsActions.update(
            {
              name,
              email,
              age,
              country,
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
          authorsActions.create(args)
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

export default AuthorRoutes;
