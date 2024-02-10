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

  create() {}

  find() {
    return this.products;
  }

  findOne(id) {
    return this.products.find((item) => item.id === id);
  }

  findCategory(category) {
    return this.products.filter((item) => item.category == category);
  }

  update() {}

  delete() {}
}

module.exports = Productsservice;
