const faker = require('@faker-js/faker');
const boom = require('@hapi/boom');

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
        image: faker.fakerES_MX.image.urlPicsumPhotos(),
        isBlock: faker.fakerES_MX.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.fakerES_MX.string.uuid(),
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 2000);
    });
  }

  async findOne(id) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw boom.notFound('Product not Found');
    }

    return product;
  }

  // async findCategory(category) {
  //   const categories = this.products.filter(
  //     (item) => item.category === category,
  //   );
  //   if (!categories) {
  //     throw boom.notFound('Category not found');
  //   }
  //   return categories;
  // }

  async update(id, changes) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product Not Found');
    }

    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product Not found');
    }

    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = Productsservice;
