import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import productService from "@/services/api/productService";
import ProductFilters from "@/components/organisms/ProductFilters";
import ProductGrid from "@/components/organisms/ProductGrid";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const CatalogPage = ({ onAddToCart, onAddToWishlist }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const searchQuery = searchParams.get("search");
      const category = searchParams.get("category");
      
      let data;
      if (searchQuery) {
        data = await productService.search(searchQuery);
      } else if (category) {
        data = await productService.getByCategory(category);
      } else {
        data = await productService.getAll();
      }
      
      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [searchParams]);

  const handleFilterChange = (filters) => {
    let filtered = [...products];

    if (filters.ageGroups.length > 0) {
      filtered = filtered.filter(product => {
        return filters.ageGroups.some(group => {
          const [min, max] = group.split("-").map(n => n === "+" ? 100 : parseInt(n));
          return product.ageMin >= min && product.ageMax <= (max || 100);
        });
      });
    }

    if (filters.categories.length > 0) {
      filtered = filtered.filter(product =>
        filters.categories.includes(product.category)
      );
    }

    if (filters.priceRange) {
      filtered = filtered.filter(product => {
        const price = product.salePrice || product.price;
        return price >= filters.priceRange.min && price <= filters.priceRange.max;
      });
    }

    if (filters.inStock) {
      filtered = filtered.filter(product => product.stockQuantity > 0);
    }

    setFilteredProducts(filtered);
  };

  const handleSort = (value) => {
    setSortBy(value);
    let sorted = [...filteredProducts];

    switch (value) {
      case "price-low":
        sorted.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        break;
      case "price-high":
        sorted.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        sorted.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    setFilteredProducts(sorted);
  };

  if (loading) return <Loading type="products" />;
  if (error) return <Error message={error} onRetry={loadProducts} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
            {searchParams.get("category") || searchParams.get("search") || "All Toys"}
          </h1>
          <p className="text-gray-600">
            {filteredProducts.length} {filteredProducts.length === 1 ? "toy" : "toys"} found
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden"
          >
            <ApperIcon name="SlidersHorizontal" className="w-4 h-4 mr-2" />
            Filters
          </Button>

          <select
            value={sortBy}
            onChange={(e) => handleSort(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className={`lg:col-span-1 ${showFilters ? "block" : "hidden lg:block"}`}>
          <ProductFilters onFilterChange={handleFilterChange} />
        </div>

        <div className="lg:col-span-3">
          <ProductGrid
            products={filteredProducts}
            onAddToCart={onAddToCart}
            onAddToWishlist={onAddToWishlist}
          />
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;