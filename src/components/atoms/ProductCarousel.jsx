import { useState, useRef } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import ProductCard from "@/components/molecules/ProductCard";
import Button from "@/components/atoms/Button";

const ProductCarousel = ({ products, title, onAddToCart, onAddToWishlist }) => {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setShowLeftArrow(container.scrollLeft > 0);
    setShowRightArrow(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    });
  };

  if (!products || products.length === 0) return null;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display font-bold text-gray-900">{title}</h2>
        <div className="flex gap-2">
          {showLeftArrow && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => scroll("left")}
              className="w-10 h-10 p-0"
            >
              <ApperIcon name="ChevronLeft" size={20} />
            </Button>
          )}
          {showRightArrow && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => scroll("right")}
              className="w-10 h-10 p-0"
            >
              <ApperIcon name="ChevronRight" size={20} />
            </Button>
          )}
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product) => (
          <motion.div
            key={product.Id}
            className="flex-shrink-0 w-72 snap-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ProductCard
              product={product}
              onAddToCart={onAddToCart}
              onAddToWishlist={onAddToWishlist}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;