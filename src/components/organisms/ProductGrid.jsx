import { motion } from "framer-motion";
import ProductCard from "@/components/molecules/ProductCard";
import Empty from "@/components/ui/Empty";

const ProductGrid = ({ products, onAddToCart, onAddToWishlist }) => {
  if (products.length === 0) {
    return (
      <Empty
        title="No toys found"
        message="Try adjusting your filters or search terms to find what you're looking for"
        icon="Package"
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {products.map((product, index) => (
        <motion.div
          key={product.Id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <ProductCard
            product={product}
            onAddToCart={onAddToCart}
            onAddToWishlist={onAddToWishlist}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProductGrid;