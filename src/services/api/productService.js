import productsData from "@/services/mockData/products.json";
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let products = [...productsData];

const productService = {
  async getAll() {
    await delay(300);
    return [...products];
  },

  async getById(id) {
    await delay(200);
    const product = products.find(p => p.Id === parseInt(id));
    if (!product) {
      throw new Error("Product not found");
    }
    return { ...product };
  },

  async getFeatured() {
    await delay(250);
    return products.filter(p => p.isFeatured).map(p => ({ ...p }));
},
  
  getDeals: async () => {
    await delay(300);
    return productsData.filter(product => product.salePrice !== null);
  },

  async getByCategory(category) {
    await delay(300);
    return products.filter(p => p.category === category).map(p => ({ ...p }));
  },

  async search(query) {
    await delay(350);
    const lowerQuery = query.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) ||
      p.brand.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
    ).map(p => ({ ...p }));
  },

  async create(product) {
    await delay(400);
    const maxId = Math.max(...products.map(p => p.Id), 0);
    const newProduct = {
      ...product,
      Id: maxId + 1,
      rating: 0,
      reviewCount: 0,
      createdAt: new Date().toISOString()
    };
    products.push(newProduct);
    return { ...newProduct };
  },

  async update(id, data) {
    await delay(350);
    const index = products.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Product not found");
    }
    products[index] = { ...products[index], ...data };
    return { ...products[index] };
  },

  async delete(id) {
    await delay(300);
    const index = products.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Product not found");
    }
    products.splice(index, 1);
    return { success: true };
  }
};

export default productService;