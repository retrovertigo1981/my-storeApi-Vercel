const express = require('express');
const router = express.Router();
const Productsservice = require('./../services/product.services');
const validatorHanlder = require('./../middlewares/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
} = require('./../schemas/product.schema');

const service = new Productsservice();

router.get(
  '/',
  validatorHanlder(queryProductSchema, 'query'),
  async (req, res, next) => {
    try {
      const products = await service.find(req.query);
      res.json(products);
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/:id',
  validatorHanlder(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHanlder(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  validatorHanlder(getProductSchema, 'params'),
  validatorHanlder(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updateProduct = await service.update(id, body);
      res.status(201).json(updateProduct);
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const rta = await service.delete(id);
    res.status(200).json({ message: 'Producto Eliminado Exitosamente', rta });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
