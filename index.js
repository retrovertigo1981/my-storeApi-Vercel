const express = require('express');
const app = express();
const { faker } = require('@faker-js/faker');
const port = 3000;
// const products = require('./products');

// -- logica de busquedas por parametros --

// function findProductById(id) {
//   return products.find((product) => product.id === parseInt(id));
// }

// function findProductCategories(id) {
//   return products.filter((product) => product.category.id === parseInt(id));
// }

// -- Rutas --

app.get('/', (req, res) => {
  res.send('Hola mi server en Express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('esta es una nueva ruta');
});

app.get('/products', (req, res) => {
  const products = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let index = 0; index < limit; index++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.urlLoremFlickr(),
    });
  }
  res.json(products);
});

app.get('/categories/:categoryId/product/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId,
  });
});

app.get('/users', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset,
    });
  } else {
    res.send('No hay parametros query');
  }
});

app.get('/products/filter', (req, res) => {
  res.send('Hola soy un filter');
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  // const resp = findProductById(id);
  if (res) {
    res.json({
      id: id,
      name: 'Product 1',
      price: 400,
    });
  } else {
    res.status(404).send('Producto no Econtrado');
  }
});

app.get('/products/category/:id', (req, res) => {
  const { id } = req.params;
  const resp = findProductCategories(id);
  if (resp && resp != '') {
    res.json(resp);
  } else {
    res.status(404).json({ error: 'categoria No encontrada' });
  }
});

app.listen(port, () => {
  console.log(`app escuchando en el puerto: ${port}`);
});
