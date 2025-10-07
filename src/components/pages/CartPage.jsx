import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ProductCarousel from "@/components/atoms/ProductCarousel";
import ApperIcon from "@/components/ApperIcon";
import CartItem from "@/components/molecules/CartItem";
import Empty from "@/components/ui/Empty";
import Loading from "@/components/ui/Loading";
import Button from "@/components/atoms/Button";
import productService from "@/services/api/productService";
const CartPage = ({ cart, onUpdateQuantity, onRemove, onClearCart }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
const loadProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await productService.getAll();
        setProducts(allProducts);

        // Load recommendations based on cart items
        if (cart.length > 0) {
          const cartProductIds = cart.map(item => item.productId);
          const recommendedProducts = await productService.getFrequentlyBoughtTogether(
            cartProductIds,
            4
          );
          setRecommendations(recommendedProducts);
        }
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [cart]);

  const getProduct = (productId) => {
    return products.find(p => p.Id === productId);
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      const product = getProduct(item.productId);
      if (!product) return total;
      const price = product.salePrice || product.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (loading) return <Loading />;

  if (cart.length === 0) {
    return (
      <Empty
        title="Your cart is empty"
        message="Start shopping and add some amazing toys to your cart"
        actionLabel="Start Shopping"
        onAction={() => navigate("/catalog")}
        icon="ShoppingCart"
      />
    );
  }

return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
          Shopping Cart
        </h1>
        <p className="text-gray-600">
          {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {cart.map((item) => {
              const product = getProduct(item.productId);
              if (!product) return null;
              return (
                <CartItem
                  key={item.productId}
                  item={item}
                  product={product}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemove={onRemove}
                />
              );
            })}
          </AnimatePresence>

          <Button
            variant="ghost"
            onClick={onClearCart}
            className="text-error hover:bg-error/10"
          >
            <ApperIcon name="Trash2" className="w-4 h-4 mr-2" />
            Clear Cart
          </Button>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-card p-6 sticky top-24 space-y-6">
            <h2 className="text-xl font-display font-bold text-gray-900">
              Order Summary
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
              </div>
              {shipping === 0 && (
                <p className="text-sm text-success">
                  <ApperIcon name="Check" className="w-4 h-4 inline mr-1" />
                  You've qualified for free shipping!
                </p>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between">
                <span className="text-lg font-display font-bold text-gray-900">Total</span>
                <span className="text-2xl font-display font-bold text-primary">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate("/checkout")}
              className="w-full"
            >
              <ApperIcon name="Lock" className="w-5 h-5 mr-2" />
              Proceed to Checkout
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate("/catalog")}
              className="w-full"
            >
              <ApperIcon name="ArrowLeft" className="w-5 h-5 mr-2" />
              Continue Shopping
            </Button>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <ApperIcon name="Shield" className="w-5 h-5 text-secondary" />
                <span>Secure checkout guaranteed</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 mt-2">
                <ApperIcon name="Truck" className="w-5 h-5 text-secondary" />
                <span>Free shipping on orders over $50</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Bought Together Carousel */}
      {recommendations.length > 0 && (
        <div className="mt-8">
          <ProductCarousel
            products={recommendations}
            title="Frequently Bought Together"
            onAddToCart={(product) => {
              onUpdateQuantity(product.Id, 1);
            }}
            onAddToWishlist={() => {}}
          />
        </div>
      )}
    </div>
  );
};

export default CartPage;