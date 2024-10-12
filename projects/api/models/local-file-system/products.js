import { readJSON } from '../../utils.js'

const { products } = readJSON('./products/products.json')

export class ProductModel {
  static async getAll({ gender, type }) {
    let filteredProducts = products

    if (gender) {
      filteredProducts = filteredProducts.filter(
        product => product.gender.toLowerCase() === gender.toLowerCase()
      )
    }

    if (type) {
      filteredProducts = filteredProducts.filter(
        product => product.type.toLowerCase() === type.toLowerCase()
      )
    }
    return filteredProducts
  }

  static async getById({ id }) {
    return products.find(product => product.id === id)
  }
}