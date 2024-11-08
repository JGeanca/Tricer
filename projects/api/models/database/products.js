export class ProductModel {
  constructor(db) {
    this.db = db
  }

  #getBaseQuery() {
    return `
      SELECT
        p.*,
        GROUP_CONCAT(DISTINCT pi.url) as images,
        GROUP_CONCAT(DISTINCT pinv.color) as colors,
        GROUP_CONCAT(DISTINCT pinv.size) as sizes
      FROM products p
      LEFT JOIN product_images pi ON p.id = pi.product_id
      LEFT JOIN product_inventory pinv ON p.id = pinv.product_id
    `
  }

  #formatProduct(product) { // Format to JSON expected by Web App
    return {
      id: product.id.toString(),
      type: product.type,
      title: product.title,
      description: product.description,
      category: product.category,
      price: parseFloat(product.price),
      discountPercentage: parseFloat(product.discount_percentage),
      rating: parseFloat(product.rating),
      colors: product.colors ? product.colors.split(',') : [],
      gender: product.gender,
      sizes: product.sizes ? product.sizes.split(',') : [],
      material: product.material,
      images: product.images ? product.images.split(',') : [],
      brand: product.brand,
      new: product.is_new === 1
    }
  }

  async getAll({ gender, type, isNew }) {
    try {
      let query = this.#getBaseQuery()
      const values = []
      const conditions = []

      if (gender) {
        conditions.push('p.gender = ?')
        values.push(gender)
      }

      if (type) {
        conditions.push('p.type = ?')
        values.push(type)
      }

      if (isNew) {
        conditions.push('p.is_new = ?')
        values.push(isNew === 'true' ? 1 : 0)
      }

      if (conditions.length) {
        query += ' WHERE ' + conditions.join(' AND ')
      }

      query += ' GROUP BY p.id'

      const [products] = await this.db.query(query, values)
      return products.map(product => this.#formatProduct(product))
    } catch (error) {
      console.error('Error in getAll:', error)
      throw error
    }
  }

  async getById({ id }) {
    try {
      const query = this.#getBaseQuery() + ' WHERE p.id = ? GROUP BY p.id'
      const [products] = await this.db.query(query, [id])
      return this.#formatProduct(products[0])
    } catch (error) {
      console.error('Error in getById:', error)
      throw error
    }
  }

  async getStock({ id }) {
    try {
      const query = `
        SELECT 
          pi.size,
          pi.color,
          pi.stock,
          p.title,
          p.id as product_id
        FROM product_inventory pi
        JOIN products p ON p.id = pi.product_id
        WHERE pi.product_id = ?
        ORDER BY pi.size, pi.color
      `
      const [stock] = await this.db.query(query, [id])
      return {
        product_id: stock[0].product_id.toString(),
        title: stock[0].title,
        inventory: stock.map(item => ({
          size: item.size,
          color: item.color,
          stock: item.stock
        })),
        total_stock: stock.reduce((sum, item) => sum + item.stock, 0)
      }
    } catch (error) {
      console.error('Error in getStock:', error)
      throw error
    }
  }
}