'use strict';

const { ProductSchema, PRODUCT_TABLE } = require('./../models/product.model');
const {
  CategorySchema,
  CATEGORY_TABLE,
} = require('./../models/category.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
    queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
  },

  async down(queryInterface, Sequelize) {
    queryInterface.dropTable(PRODUCT_TABLE);
    queryInterface.dropTable(CATEGORY_TABLE);
  },
};
