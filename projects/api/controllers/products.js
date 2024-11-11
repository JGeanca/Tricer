export class ProductController {
  constructor({ productModel }) {
    this.productModel = productModel
  }

  getAll = async (req, res) => {
    try {
      const { gender, type, new: isNew } = req.query
      const products = await this.productModel.getAll({ gender, type, isNew })
      return res.json(products)
    } catch (error) {
      console.error('[getAll]:', error.message)
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  getById = async (req, res) => {
    try {
      const { id } = req.params
      const product = await this.productModel.getById({ id })
      return res.json(product)
    } catch (error) {
      console.error('[getById]:', error.message)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  getStock = async (req, res) => {
    try {
      const { id } = req.params
      const stock = await this.productModel.getStock({ id })
      if (!stock) return res.status(404).json({ message: 'Product not found' })
      return res.json(stock)
    } catch (error) {
      console.error('[getStock]:', error.message)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }
}