/**
  * @fileOverview Contains routes for Websites
*/
import { Meteor } from 'meteor/meteor';
import { Picker } from 'meteor/meteorhacks:picker';
import websitesActions from '../actions/WebsitesActions';

/**
 * @name {WebsiteRoutes}
 */
class WebsiteRoutes {
  /**
   * Method, that do routes initialization on server
   * @method
   * @this {WebsiteRoutes}
   */
  static init () {
    Picker.route('/server/websites', function (params, request, response) {
      if (request.method === 'GET') {
        websitesActions.findAll()
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

    Picker.route('/server/websites/:id', function (params, request, response) {
      const { id } = params;

      switch (request.method) {
        case 'GET':
          websitesActions.find(id)
            .then((Website) => {
              if (!Website.length) {
                throw new Meteor.Error(500, 'Record does not exist');
              }
              const [ data ] = Website;
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
          websitesActions.delete({
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

    Picker.route('/server/websites/:id/:title/:description/:url', function (params, request, response) {
      const { id, ...args } = params;
      const {
        title,
        description,
      } = params;

      switch (request.method) {
        case 'PUT':
          websitesActions.update(
            {
              title,
              description,
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
          websitesActions.create(args)
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

export default WebsiteRoutes;
