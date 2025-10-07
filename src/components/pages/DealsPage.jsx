import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import productService from "@/services/api/productService";
import ProductGrid from "@/components/organisms/ProductGrid";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const DealsPage = ({ onAddToCart, onAddToWishlist }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDeals = async () => {
    try {
      setLoading(true);
      setError(null);
      const allProducts = await productService.getAll();
      const dealsProducts = allProducts.filter(p => p.salePrice && p.salePrice < p.price);
      setProducts(dealsProducts);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load deals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDeals();
  }, []);

  if (loading) return <Loading type="products" />;
  if (error) return <Error message={error} onRetry={loadDeals} />;

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-display font-bold text-gray-900">
          🎉 Amazing Deals
        </h1>
        <p className="text-xl text-gray-600">
          Save big on your favorite toys with our special offers
        </p>
      </div>

      {products.length === 0 ? (
        <Empty
          title="No deals available right now"
          message="Check back soon for amazing discounts on toys"
          icon="Tag"
        />
      ) : (
        <ProductGrid
          products={products}
          onAddToCart={onAddToCart}
          onAddToWishlist={onAddToWishlist}
        />
      )}
    </div>
  );
};

export default DealsPage;