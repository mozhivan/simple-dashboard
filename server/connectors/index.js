import Sequelize from 'sequelize';
import Authors from './models/Authors';
import Articles from './models/Articles';
import Websites from './models/Websites';
import ArticleWebsite from './models/ArticleWebsite';
import config from '../../config/config.json';

const env = process.env.NODE_ENV || 'development';
const {
  database,
  username,
  password,
  host,
  port,
  dialect,
} = config[env];
const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
  })
  : new Sequelize(
    database,
    username,
    password,
    {
      host,
      port,
      dialect,
      pool: {
        max: 9,
        min: 0,
        idle: 10000,
      },
    }
  );
const models = {
  Authors: Authors.init(sequelize, Sequelize),
  Articles: Articles.init(sequelize, Sequelize),
  Websites: Websites.init(sequelize, Sequelize),
  ArticleWebsite: ArticleWebsite.init(sequelize, Sequelize),
};

Object.values(models).forEach((model) => {
  model.associate(models);
});

export {
  models,
  sequelize,
};
