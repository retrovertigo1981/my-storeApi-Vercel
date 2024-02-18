const joi = require('joi');

const id = joi.string().uuid();
const name = joi.string().min(5).max(30);
const price = joi.number().integer().min(10);
const category = joi.string().alphanum().min(1).max(30);
const image = joi.string().uri();

const createProductSchema = joi.object({
  name: name.required(),
  price: price.required(),
  category: category.required(),
  image: image.required(),
});

const updateProductSchema = joi.object({
  name: name,
  price: price,
  category: category,
  image: image,
});

const getProductSchema = joi.object({
  id: id.required(),
});

const getCategorySchema = joi.object({
  category: category.required(),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  getCategorySchema,
};
