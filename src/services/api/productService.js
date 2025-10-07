import productsData from "@/services/mockData/products.json";

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

const getSimilarProducts = async (productId, limit = 4) => {
  await delay(300);
  const product = products.find(p => p.Id === parseInt(productId));
  if (!product) return [];

  // Find similar products based on category and price range
  const similar = products
    .filter(p => {
      if (p.Id === product.Id) return false;
      const sameCategoryOrTag = 
        p.category === product.category ||
        p.tags?.some(tag => product.tags?.includes(tag));
      const similarPrice = Math.abs(p.price - product.price) < product.price * 0.5;
      return sameCategoryOrTag || similarPrice;
    })
    .sort((a, b) => {
      // Prioritize same category, then price similarity
      const aCategoryMatch = a.category === product.category ? 1 : 0;
      const bCategoryMatch = b.category === product.category ? 1 : 0;
      if (aCategoryMatch !== bCategoryMatch) return bCategoryMatch - aCategoryMatch;
      return Math.abs(a.price - product.price) - Math.abs(b.price - product.price);
    })
    .slice(0, limit);

  return similar.map(p => ({ ...p }));
};

const getFrequentlyBoughtTogether = async (productIds, limit = 4) => {
  await delay(300);
  if (!productIds || productIds.length === 0) return [];

  // Get categories of cart items
  const cartProducts = products.filter(p => productIds.includes(p.Id));
  const cartCategories = [...new Set(cartProducts.map(p => p.category))];
  const cartTags = [...new Set(cartProducts.flatMap(p => p.tags || []))];

  // Find complementary products (different category but related tags)
  const recommendations = products
    .filter(p => {
      if (productIds.includes(p.Id)) return false;
      const hasRelatedTag = p.tags?.some(tag => cartTags.includes(tag));
      const differentCategory = !cartCategories.includes(p.category);
      return hasRelatedTag || (!differentCategory && Math.random() > 0.5);
    })
    .sort(() => Math.random() - 0.5)
    .slice(0, limit);

  return recommendations.map(p => ({ ...p }));
};

export default {
  ...productService,
  getSimilarProducts,
  getFrequentlyBoughtTogether
};