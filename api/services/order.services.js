const boom = require('@hapi/boom');

const { models } = require('./../utils/sequelize');

class OrderService {
  constructor() {}

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async find() {
    const response = await models.Order.findAll();
    return response;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        'items',
      ],
    });
    if (!order) {
      throw boom.notFound('Order not found');
    }
    return order;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    const order = await models.Order.findByPk(id);
    if (!order) {
      throw boom.notFound('Order Not Found');
    }
    await order.destroy();
    return { id };
  }
}

module.exports = OrderService;
