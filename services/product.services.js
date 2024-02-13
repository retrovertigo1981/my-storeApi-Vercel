const faker = require('@faker-js/faker');

class Productsservice {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.fakerES_MX.string.uuid(),
        name: faker.fakerES_MX.commerce.productName(),
        price: parseInt(faker.fakerES_MX.commerce.price(), 10),
        category: faker.fakerES_MX.commerce.department(),
        image: faker.fakerES_MX.image.urlPicsumPhotos(),
      });
    }
  }

  create(data) {
    const newProduct = {
      id: faker.fakerES_MX.string.uuid(),
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  find() {
    return this.products;
  }

  findOne(id) {
    return this.products.find((item) => item.id === id);
  }

  findCategory(category) {
    return this.products.filter((item) => item.category === category);
  }

  update(id, changes) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('Producto No Encontrado');
    }

    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    };
    return this.products[index];
  }

  delete(id) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('Error!!!!!');
    }

    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = Productsservice;
