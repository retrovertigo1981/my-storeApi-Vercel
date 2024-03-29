const boom = require('@hapi/boom');

// const pool = require('../utils/postgres.pool');
const { models } = require('../utils/sequelize');

class UserService {
  constructor() {}

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  async find() {
    const response = await models.User.findAll({
      include: ['customer'],
    });
    return response;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    return user;
  }

  async update(id, changes) {
    const user = await models.User.findByPk(id);
    const response = user.update(changes);
    return response;
  }

  async delete(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('Usuario no Encontrado');
    }
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
