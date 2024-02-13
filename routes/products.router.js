const express = require('express');
const router = express.Router();
const Productsservice = require('./../services/product.services');

const service = new Productsservice();

router.get('/', (req, res) => {
  const products = service.find();
  res.json(products);
});

// router.get('/filter', (req, res) => {
//   res.send('Hola soy un filter');
// });

router.get('/category/:category', (req, res) => {
  const { category } = req.params;
  const productsByCategory = service.findCategory(category);
  if (productsByCategory != '') {
    res.status(201).json(productsByCategory);
  } else {
    res.status(401).json({
      message: 'categoria no encontrada',
    });
  }
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = service.findOne(id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: 'Producto No encontrando' });
  }
});

router.post('/', (req, res) => {
  const body = req.body;
  const newProduct = service.create(body);
  res.status(201).json(newProduct);
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const updateProduct = service.update(id, body);
  res.status(201).json(updateProduct);
});

router.delete('/:id', (req, res) => {
  try {
    const id = req.params.id;
    const rta = service.delete(id);
    res.status(200).json({ message: 'Producto Eliminado Exitosamente', rta });
  } catch (error) {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});

module.exports = router;
