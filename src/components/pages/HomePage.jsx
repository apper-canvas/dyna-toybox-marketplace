import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import productService from "@/services/api/productService";
import HeroSection from "@/components/organisms/HeroSection";
import ProductGrid from "@/components/organisms/ProductGrid";
import CategoryCard from "@/components/molecules/CategoryCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const HomePage = ({ onAddToCart, onAddToWishlist }) => {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const [featured, all] = await Promise.all([
        productService.getFeatured(),
        productService.getAll()
      ]);
      setFeaturedProducts(featured.slice(0, 8));
      setAllProducts(all);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const getCategoryCount = (category) => {
    return allProducts.filter(p => p.category === category).length;
  };

  const categories = [
    "Action Figures & Playsets",
    "Dolls & Accessories",
    "Board Games & Puzzles",
    "Educational & STEM Toys",
    "Building & Construction",
    "Arts & Crafts",
    "Outdoor & Sports",
    "Electronic & Interactive"
  ];

  if (loading) return <Loading type="products" />;
  if (error) return <Error message={error} onRetry={loadProducts} />;

  return (
    <div className="space-y-16 pb-16">
      <HeroSection />

      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">
              Shop by Category
            </h2>
            <p className="text-gray-600">Find toys perfect for every age and interest</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <CategoryCard
              key={category}
              category={category}
              count={getCategoryCount(category)}
            />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">
              Featured Toys
            </h2>
            <p className="text-gray-600">Hand-picked favorites loved by kids</p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate("/catalog")}
          >
            View All
            <ApperIcon name="ArrowRight" className="w-4 h-4 ml-2" />
          </Button>
        </div>
        <ProductGrid
          products={featuredProducts}
          onAddToCart={onAddToCart}
          onAddToWishlist={onAddToWishlist}
        />
      </section>

      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">
            Join the ToyBox Community
          </h2>
          <p className="text-lg text-gray-600">
            Get exclusive deals, new arrival alerts, and special offers delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button variant="primary" size="lg">
              Subscribe
            </Button>
          </div>
          <p className="text-sm text-gray-500">
            Join 2,000+ happy subscribers. No spam, unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;