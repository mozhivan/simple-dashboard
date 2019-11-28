import { Meteor } from 'meteor/meteor';
import { sequelize } from './connectors';
import Routes from './routes';
import seed from '../seeders/seed';

Meteor.startup(async () => {
  sequelize.authenticate()
    .then(() => sequelize.sync({ force: true }))
    .then(async () => seed())
    .catch((reason) => {
      throw new Meteor.Error(500, reason.message);
    });
  Routes.init();
});
