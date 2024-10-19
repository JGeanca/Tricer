import { ProductModel } from '../models/local-file-system/products.js'

export class ProductController {
  //* We assume that the logic if the request returns a empty array is handled in
  //* the frontend
  //* But we can handle 404 errors if the product is not found
  // TODO: Make the model return the error but the result too for more robustness

  static async getAll(req, res) {
    const { gender, type, new: isNew } = req.query
    const products = await ProductModel.getAll({ gender, type, isNew })
    res.json({
      results: products.length,
      products: products
    })
  }

  static async getById(req, res) {
    const { id } = req.params
    const product = await ProductModel.getById({ id })
    return res.json(product)
  }
}