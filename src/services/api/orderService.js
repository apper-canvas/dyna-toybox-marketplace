import ordersData from "@/services/mockData/orders.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let orders = [...ordersData];

const orderService = {
  async getAll() {
    await delay(300);
    return [...orders];
  },

  async getById(id) {
    await delay(300);
    
    if (!Number.isInteger(id)) {
      throw new Error('Order ID must be an integer');
    }

    const order = orders.find(o => o.Id === id);
    
    if (!order) {
      throw new Error(`Order with ID ${id} not found`);
    }

    return { ...order };
  },

  async getById(id) {
    await delay(200);
    const order = orders.find(o => o.Id === parseInt(id));
    if (!order) {
      throw new Error("Order not found");
    }
    return { ...order };
  },

  async create(order) {
    await delay(400);
    const maxId = Math.max(...orders.map(o => o.Id), 0);
    const newOrder = {
      ...order,
      Id: maxId + 1,
      status: "Processing",
      orderDate: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    };
    orders.push(newOrder);
    return { ...newOrder };
  }
};

export default orderService;