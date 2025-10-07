import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const CartItem = ({ item, product, onUpdateQuantity, onRemove }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="flex gap-4 p-4 bg-white rounded-lg border border-gray-200"
    >
      <img
        src={product.images[0]}
        alt={product.name}
        className="w-20 h-20 object-cover rounded-md"
      />
      
      <div className="flex-1 min-w-0">
        <h4 className="font-display font-semibold text-gray-900 truncate">
          {product.name}
        </h4>
        <p className="text-sm text-gray-600">{product.brand}</p>
        <p className="text-lg font-bold text-primary mt-1">
          ${(product.salePrice || product.price).toFixed(2)}
        </p>
      </div>

      <div className="flex flex-col items-end justify-between">
        <button
          onClick={() => onRemove(item.productId)}
          className="text-gray-400 hover:text-error transition-colors"
        >
          <ApperIcon name="X" className="w-5 h-5" />
        </button>
        
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg">
          <button
            onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-l-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ApperIcon name="Minus" className="w-4 h-4" />
          </button>
          <span className="w-8 text-center font-semibold">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
            disabled={item.quantity >= product.stockQuantity}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-r-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ApperIcon name="Plus" className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;