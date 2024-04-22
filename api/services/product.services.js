// const faker = require('@faker-js/faker');
const boom = require('@hapi/boom');
// const pool = require('../utils/postgres.pool');
const { models } = require('../utils/sequelize');
const { Op } = require('sequelize');

class Productsservice {
  constructor() {
    // this.products = [];
    // this.generate();
    // this.pool = pool;
    // this.pool.on('error', (err) => {
    //   console.error('Unexpected error on idle client', err);
    //   process.exit(-1);
    // });
  }

  // generate() {
  //   const limit = 100;
  //   for (let index = 0; index < limit; index++) {
  //     this.products.push({
  //       id: faker.fakerES_MX.string.uuid(),
  //       name: faker.fakerES_MX.commerce.productName(),
  //       price: parseInt(faker.fakerES_MX.commerce.price(), 10),
  //       image: faker.fakerES_MX.image.urlPicsumPhotos(),
  //       isBlock: faker.fakerES_MX.datatype.boolean(),
  //     });
  //   }
  // }

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(query) {
    const options = {
      include: ['category'],
      where: {},
    };
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    const { price } = query;
    if (price) {
      options.where.price = price;
    }

    const { price_min, price_max } = query;
    if (price_min && price_max) {
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max,
      };
    }
    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id, {
      include: ['category'],
    });
    if (!product) {
      throw boom.notFound('Product not Found');
    }

    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product Not Found');
    }

    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product Not found');
    }

    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = Productsservice;
