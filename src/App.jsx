import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import WishlistPage from "@/components/pages/WishlistPage";
import CatalogPage from "@/components/pages/CatalogPage";
import HomePage from "@/components/pages/HomePage";
import CheckoutPage from "@/components/pages/CheckoutPage";
import CartPage from "@/components/pages/CartPage";
import ProductDetailPage from "@/components/pages/ProductDetailPage";
import OrdersPage from "@/components/pages/OrdersPage";
import OrderDetailPage from "@/components/pages/OrderDetailPage";
import Header from "@/components/organisms/Header";
function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("toybox-cart");
    const savedWishlist = localStorage.getItem("toybox-wishlist");
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  useEffect(() => {
    localStorage.setItem("toybox-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("toybox-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const handleAddToCart = (product) => {
    const existingItem = cart.find(item => item.productId === product.Id);
    
    if (existingItem) {
      if (existingItem.quantity >= product.stockQuantity) {
        toast.warning("Cannot add more items than available in stock");
        return;
      }
      setCart(cart.map(item =>
        item.productId === product.Id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, {
        productId: product.Id,
        quantity: 1,
        addedAt: new Date().toISOString()
      }]);
    }
    
    toast.success("Added to cart!");
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(cart.map(item =>
      item.productId === productId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter(item => item.productId !== productId));
    toast.info("Removed from cart");
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      setCart([]);
      toast.info("Cart cleared");
    }
  };

  const handleAddToWishlist = (product) => {
    if (wishlist.includes(product.Id)) {
      setWishlist(wishlist.filter(id => id !== product.Id));
      toast.info("Removed from wishlist");
    } else {
      setWishlist([...wishlist, product.Id]);
      toast.success("Added to wishlist!");
    }
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Header cartCount={cartCount} wishlistCount={wishlistCount} />
        
        <main className="max-w-7xl mx-auto px-4 py-8">
          <AnimatePresence mode="wait">
<Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    onAddToCart={handleAddToCart}
                    onAddToWishlist={handleAddToWishlist}
                  />
                }
              />
              <Route
                path="/catalog"
                element={
                  <CatalogPage
                    onAddToCart={handleAddToCart}
                    onAddToWishlist={handleAddToWishlist}
                  />
                }
              />
              <Route
                path="/product/:id"
                element={
                  <ProductDetailPage
                    onAddToCart={handleAddToCart}
                    onAddToWishlist={handleAddToWishlist}
                  />
                }
              />
              <Route
                path="/cart"
                element={
                  <CartPage
                    cart={cart}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemoveFromCart}
                    onClearCart={handleClearCart}
                  />
                }
              />
              <Route
                path="/wishlist"
                element={
                  <WishlistPage
                    wishlist={wishlist}
                    onAddToCart={handleAddToCart}
                    onRemoveFromWishlist={handleAddToWishlist}
                  />
                }
              />
              <Route
                path="/orders"
                element={<OrdersPage />}
              />
              <Route
                path="/orders/:id"
                element={<OrderDetailPage />}
              />
              <Route
                path="/checkout"
                element={
                  <CheckoutPage cart={cart} onClearCart={handleClearCart} />
                }
              />
            </Routes>
          </AnimatePresence>
        </main>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </BrowserRouter>
  );
}

export default App;