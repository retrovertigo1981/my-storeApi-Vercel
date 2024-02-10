const express = require('express');
const router = express.Router();
const Productsservice = require('./../services/product.services');

const service = new Productsservice();

router.get('/', (req, res) => {
  const products = service.find();
  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send('Hola soy un filter');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = service.findOne(id);
  res.json(product);
});

router.get('/:category', (req, res) => {
  const { category } = req.params;
  const productsByCategory = service.findCategory(category);
  res.json(productsByCategory);
});

router.post('/', (req, res) => {
  const body = req.body;
  res.status(201).json({
    message: 'Producto Creado',
    data: body,
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'Producto Actualizado Satisfactoriamente',
    data: body,
    id,
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  res.json({
    message: 'Producto Eliminado Exitosamente',
    id,
  });
});

module.exports = router;
