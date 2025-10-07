import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';

function FeaturedDeals({ products, onAddToCart, onAddToWishlist }) {
  const navigate = useNavigate();

  const calculateDiscount = (price, salePrice) => {
    return Math.round(((price - salePrice) / price) * 100);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {products.map((product) => {
        const discount = calculateDiscount(product.price, product.salePrice);
        
        return (
          <motion.div
            key={product.Id}
            variants={itemVariants}
            whileHover={{ y: -8, scale: 1.02 }}
            className="relative bg-gradient-to-br from-primary/5 via-white to-secondary/5 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group"
          >
            {/* Discount Badge */}
            <div className="absolute top-3 left-3 z-10">
              <Badge variant="deal" className="text-sm px-3 py-1">
                {discount}% OFF
              </Badge>
            </div>

            {/* Wishlist Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onAddToWishlist(product)}
              className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors"
            >
              <ApperIcon name="Heart" size={20} className="text-primary" />
            </motion.button>

            {/* Product Image */}
            <div 
              className="relative h-56 bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden cursor-pointer"
              onClick={() => navigate(`/product/${product.Id}`)}
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Product Info */}
            <div className="p-5">
              {/* Brand & Stock */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-secondary uppercase tracking-wide">
                  {product.brand}
                </span>
                {product.stockQuantity < 10 && (
                  <Badge variant="warning" className="text-xs">
                    Only {product.stockQuantity} left!
                  </Badge>
                )}
              </div>

              {/* Product Name */}
              <h3 
                className="text-lg font-display font-bold text-gray-900 mb-3 line-clamp-2 cursor-pointer hover:text-primary transition-colors"
                onClick={() => navigate(`/product/${product.Id}`)}
              >
                {product.name}
              </h3>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-2xl font-bold text-error">
                  ${product.salePrice.toFixed(2)}
                </span>
                <span className="text-lg text-gray-400 line-through">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <ApperIcon
                      key={i}
                      name="Star"
                      size={16}
                      className={i < Math.floor(product.rating) ? "text-accent fill-accent" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviewCount})
                </span>
              </div>

              {/* Add to Cart Button */}
              <Button
                onClick={() => onAddToCart(product)}
                disabled={product.stockQuantity === 0}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                {product.stockQuantity === 0 ? (
                  'Out of Stock'
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <ApperIcon name="ShoppingCart" size={18} />
                    Add to Cart
                  </span>
                )}
              </Button>

              {/* Age Range */}
              <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-500">
                <ApperIcon name="Baby" size={14} />
                <span>Ages {product.ageMin}-{product.ageMax}</span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default FeaturedDeals;