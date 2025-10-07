import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { format } from "date-fns";
import ProductCarousel from "@/components/atoms/ProductCarousel";
import ApperIcon from "@/components/ApperIcon";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import productService from "@/services/api/productService";
import reviewService from "@/services/api/reviewService";
const ProductDetailPage = ({ onAddToCart, onAddToWishlist }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
const loadProductData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [productData, reviewsData, similarProductsData] = await Promise.all([
        productService.getById(id),
        reviewService.getByProductId(id),
        productService.getSimilarProducts(id, 4)
      ]);
      setProduct(productData);
      setReviews(reviewsData);
      setSimilarProducts(similarProductsData);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load product details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProductData();
  }, [id]);
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  if (loading) return <Loading type="details" />;
  if (error) return <Error message={error} onRetry={loadProductData} />;
  if (!product) return null;

  const stockStatus = product.stockQuantity === 0 ? "Out of Stock" :
                     product.stockQuantity <= 10 ? `Only ${product.stockQuantity} left` :
                     "In Stock";
  const displayPrice = product.salePrice || product.price;
  const hasDiscount = product.salePrice && product.salePrice < product.price;

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-square bg-gray-100 rounded-lg overflow-hidden"
          >
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <div className="grid grid-cols-5 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                  selectedImage === index ? "border-primary" : "border-gray-200"
                }`}
              >
                <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="age">
                {product.ageMin}-{product.ageMax} years
              </Badge>
              {hasDiscount && <Badge variant="error">SALE</Badge>}
              {product.isFeatured && <Badge variant="primary">Featured</Badge>}
            </div>
            <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <p className="text-lg text-gray-600">{product.brand}</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <ApperIcon
                  key={i}
                  name="Star"
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? "text-accent fill-accent"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-600">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-display font-bold text-primary">
              ${displayPrice.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-xl text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${
              product.stockQuantity === 0 ? "bg-error" :
              product.stockQuantity <= 10 ? "bg-warning" :
              "bg-success"
            }`} />
            <span className={`font-medium ${
              product.stockQuantity === 0 ? "text-error" :
              product.stockQuantity <= 10 ? "text-warning" :
              "text-success"
            }`}>
              {stockStatus}
            </span>
          </div>

          <div className="border-t border-b border-gray-200 py-6 space-y-4">
            <div>
              <h3 className="font-display font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Category</p>
                <p className="font-medium text-gray-900">{product.category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Material</p>
                <p className="font-medium text-gray-900">{product.material}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Weight</p>
                <p className="font-medium text-gray-900">{product.weight} lbs</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Dimensions</p>
                <p className="font-medium text-gray-900">
                  {product.dimensions.length}" × {product.dimensions.width}" × {product.dimensions.height}"
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="text-gray-900 font-medium">Quantity:</label>
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 rounded-l-lg transition-colors"
                >
                  <ApperIcon name="Minus" className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                  disabled={quantity >= product.stockQuantity}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 rounded-r-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ApperIcon name="Plus" className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="primary"
                size="lg"
                onClick={handleAddToCart}
                disabled={product.stockQuantity === 0}
                className="flex-1"
              >
                <ApperIcon name="ShoppingCart" className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => onAddToWishlist(product)}
              >
                <ApperIcon name="Heart" className="w-5 h-5" />
              </Button>
            </div>

            <Button
              variant="secondary"
              size="lg"
              onClick={handleBuyNow}
              disabled={product.stockQuantity === 0}
              className="w-full"
            >
              <ApperIcon name="Zap" className="w-5 h-5 mr-2" />
              Buy Now
            </Button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-12">
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-8">
          Customer Reviews ({reviews.length})
        </h2>
        
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.Id} className="bg-white rounded-lg shadow-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <p className="font-display font-semibold text-gray-900">
                      {review.userName}
                    </p>
                    {review.isVerifiedPurchase && (
                      <Badge variant="success">
                        <ApperIcon name="CheckCircle" className="w-3 h-3 mr-1" />
                        Verified Purchase
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <ApperIcon
                          key={i}
                          name="Star"
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "text-accent fill-accent"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {format(new Date(review.createdAt), "MMM d, yyyy")}
                    </span>
                  </div>
                </div>
              </div>
              
              {review.title && (
                <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
              )}
              <p className="text-gray-600 mb-4">{review.comment}</p>
              
              <button className="text-sm text-gray-500 hover:text-primary transition-colors">
                <ApperIcon name="ThumbsUp" className="w-4 h-4 inline mr-1" />
                Helpful ({review.helpfulCount})
              </button>
            </div>
))}
        </div>
      </div>

      {/* Similar Products Carousel */}
      {similarProducts.length > 0 && (
        <div className="mt-12">
          <ProductCarousel
            products={similarProducts}
            title="Similar Products You May Like"
            onAddToCart={onAddToCart}
            onAddToWishlist={onAddToWishlist}
          />
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;