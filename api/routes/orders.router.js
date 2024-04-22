const express = require('express');
const router = express.Router();
const OrdersService = require('./../services/order.services');
const validatorHanlder = require('./../middlewares/validator.handler');
const {
  getOrderSchema,
  createOrderSchema,
} = require('./../schemas/order.schema');

const { addItemSchema } = require('./../schemas/orderProduct.schema');

const service = new OrdersService();

router.get('/', async (req, res) => {
  const orders = await service.find();
  res.json(orders);
});

router.get(
  '/:id',
  validatorHanlder(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHanlder(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOrder = await service.create(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/add-item',
  validatorHanlder(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newItem = await service.addItem(body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
