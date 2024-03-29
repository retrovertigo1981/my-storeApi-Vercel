const boom = require('@hapi/boom');

// const pool = require('../utils/postgres.pool');
const { models } = require('../utils/sequelize');

class CustomerService {
  constructor() {}

  async find() {
    const response = await models.Customer.findAll({
      include: ['user'],
    });
    return response;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('Cliente no Encontrado');
    }
    return customer;
  }

  async create(data) {
    const newCustomer = await models.Customer.create(data, {
      include: ['user'],
    });
    return newCustomer;
  }

  async update(id, changes) {
    const customer = await models.Customer.findByPk(id);
    const response = customer.update(changes);
    return response;
  }

  async delete(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('Cliente no Encontrado');
    }
    await customer.destroy();
    return { id };
  }
}

module.exports = CustomerService;
