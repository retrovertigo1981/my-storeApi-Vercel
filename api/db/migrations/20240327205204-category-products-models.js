'use strict';

const { ProductSchema, PRODUCT_TABLE } = require('./../models/product.model');
const {
  CategorySchema,
  CATEGORY_TABLE,
} = require('./../models/category.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
  },

  async down(queryInterface, Sequelize) {
    queryInterface.dropTable(CATEGORY_TABLE);
    queryInterface.dropTable(PRODUCT_TABLE);
  },
};
