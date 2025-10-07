import reviewsData from "@/services/mockData/reviews.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let reviews = [...reviewsData];

const reviewService = {
  async getByProductId(productId) {
    await delay(250);
    return reviews.filter(r => r.productId === parseInt(productId)).map(r => ({ ...r }));
  },

  async create(review) {
    await delay(300);
    const maxId = Math.max(...reviews.map(r => r.Id), 0);
    const newReview = {
      ...review,
      Id: maxId + 1,
      helpfulCount: 0,
      createdAt: new Date().toISOString()
    };
    reviews.push(newReview);
    return { ...newReview };
  },

  async markHelpful(id) {
    await delay(200);
    const review = reviews.find(r => r.Id === parseInt(id));
    if (!review) {
      throw new Error("Review not found");
    }
    review.helpfulCount += 1;
    return { ...review };
  }
};

export default reviewService;