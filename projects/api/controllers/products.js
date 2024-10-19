export class ProductController {
  constructor({ productModel }) {
    this.productModel = productModel
  }

  //* We assume that the logic if the request returns a empty array is handled in
  //* the frontend
  //* But we can handle 404 errors if the product is not found
  // TODO: Make the model return the error but the result too for more robustness

  getAll = async (req, res) => {
    const { gender, type, new: isNew } = req.query
    const products = await this.productModel.getAll({ gender, type, isNew })
    res.json(products)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const product = await this.productModel.getById({ id })
    return res.json(product)
  }
}