import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import productService from "@/services/api/productService";
import ProductCard from "@/components/molecules/ProductCard";
import Empty from "@/components/ui/Empty";
import Loading from "@/components/ui/Loading";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const WishlistPage = ({ wishlist, onAddToCart, onRemoveFromWishlist }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await productService.getAll();
        const wishlistProducts = allProducts.filter(p => 
          wishlist.includes(p.Id)
        );
        setProducts(wishlistProducts);
      } catch (err) {
        console.error("Failed to load wishlist products:", err);
        toast.error("Failed to load wishlist");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [wishlist]);

  const handleAddAllToCart = () => {
    products.forEach(product => onAddToCart(product));
    toast.success("All items added to cart!");
  };

  if (loading) return <Loading type="products" />;

  if (products.length === 0) {
    return (
      <Empty
        title="Your wishlist is empty"
        message="Save your favorite toys to your wishlist for easy access later"
        icon="Heart"
      />
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
            My Wishlist
          </h1>
          <p className="text-gray-600">
            {products.length} {products.length === 1 ? "toy" : "toys"} saved
          </p>
        </div>
        {products.length > 0 && (
          <Button
            variant="primary"
            onClick={handleAddAllToCart}
          >
            <ApperIcon name="ShoppingCart" className="w-5 h-5 mr-2" />
            Add All to Cart
          </Button>
        )}
      </div>

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
              onAddToWishlist={onRemoveFromWishlist}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default WishlistPage;