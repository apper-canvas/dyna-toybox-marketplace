import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";

const ProductCard = ({ product, onAddToCart, onAddToWishlist }) => {
  const navigate = useNavigate();

  const getStockStatus = () => {
    if (product.stockQuantity === 0) return { text: "Out of Stock", color: "error" };
    if (product.stockQuantity <= 10) return { text: `Only ${product.stockQuantity} left`, color: "warning" };
    return { text: "In Stock", color: "success" };
  };

  const stockStatus = getStockStatus();
  const displayPrice = product.salePrice || product.price;
  const hasDiscount = product.salePrice && product.salePrice < product.price;

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-lg shadow-card hover:shadow-card-hover overflow-hidden cursor-pointer group"
      onClick={() => navigate(`/product/${product.Id}`)}
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <Badge variant="age">
            {product.ageMin}-{product.ageMax} years
          </Badge>
          {hasDiscount && (
            <Badge variant="error" className="bg-gradient-to-r from-error to-pink-500 text-white">
SALE
            </Badge>
          )}
          {product.isFeatured && (
            <Badge variant="primary" className="bg-gradient-to-r from-accent to-yellow-400 text-gray-900">
              Featured
            </Badge>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onAddToWishlist(product);
            }}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-primary hover:text-white transition-colors"
          >
            <ApperIcon name="Heart" className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-display font-semibold text-lg text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{product.brand}</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <ApperIcon
                key={i}
                name="Star"
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "text-accent fill-accent"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-display font-bold text-primary">
              ${displayPrice.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full bg-${stockStatus.color}`} />
            <span className={`text-xs text-${stockStatus.color} font-medium`}>
              {stockStatus.text}
            </span>
          </div>
        </div>

        <Button
          variant="primary"
          className="w-full"
          disabled={product.stockQuantity === 0}
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
        >
          <ApperIcon name="ShoppingCart" className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </motion.div>
  );
};

export default ProductCard;