const boom = require('@hapi/boom');

// const pool = require('../utils/postgres.pool');
const { models } = require('../utils/sequelize');

class UserService {
  constructor() {
    // this.pool = pool;
    // this.pool.on('error', (err) => {
    //   console.error('Unexpected error on idle client', err);
    //   process.exit(-1);
    // });
  }

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  async find() {
    const response = await models.User.findAll();
    return response;
  }

  async findOne(id) {
    return { id };
  }

  async update(id, changes) {
    const user = await models.User.findByPk(id);
    const response = user.update(changes);
    return response;
  }

  async delete(id) {
    const user = await models.User.findByPk(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
