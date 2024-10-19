import { readJSON } from '../../utils.js'

const { products } = readJSON('./repositories/products.json')

export class ProductModel {
  static async getAll({ gender, type, isNew }) {
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

    if (isNew == 'true') {
      filteredProducts = filteredProducts.filter(
        product => product.new === true
      )
    }

    return filteredProducts
  }

  static async getById({ id }) {
    return products.find(product => product.id === id)
  }
}