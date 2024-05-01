const { Sequelize } = require('sequelize');
const { config } = require('./../config/config');

const setupModels = require('./../db/models');

let URI = '';

if (config.isProduction) {
  URI = config.dbURL;
} else {
  const USER = encodeURIComponent(config.dbUser);
  const PASSWORD = encodeURIComponent(config.dbPassword);
  URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
}

const options = {
  dialect: 'postgres',
  logging: config.isProduction ? true : false,
};

if (config.isProduction) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

const sequelize = new Sequelize(URI, options);

setupModels(sequelize);

module.exports = sequelize;
