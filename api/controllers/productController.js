const productController = {
  getProductsOwned: async (req, res) => {
    try {
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  createProduct: async (req, res) => {
    try {
      return res.status(201).json({ success: true });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

module.exports = productController;
