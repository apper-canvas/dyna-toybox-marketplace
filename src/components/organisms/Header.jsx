import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";

const Header = ({ cartCount = 0, wishlistCount = 0 }) => {
const navigate = useNavigate();
  const [showCategories, setShowCategories] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const categories = [
    { name: "Action Figures & Playsets", icon: "Sword" },
    { name: "Dolls & Accessories", icon: "Baby" },
    { name: "Board Games & Puzzles", icon: "Puzzle" },
    { name: "Educational & STEM Toys", icon: "GraduationCap" },
    { name: "Building & Construction", icon: "Blocks" },
    { name: "Arts & Crafts", icon: "Palette" },
    { name: "Outdoor & Sports", icon: "Bike" },
    { name: "Electronic & Interactive", icon: "Gamepad2" }
  ];

const handleSearch = (query) => {
    navigate(`/catalog?search=${encodeURIComponent(query)}`);
  };

  useEffect(() => {
    let scrollTimeout;
    
    const handleScroll = () => {
      setIsScrolling(true);
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-md">
    <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
                <button onClick={() => navigate("/")} className="flex items-center gap-2 group">
                    <div
                        className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                        <ApperIcon name="Box" className="w-6 h-6 text-white" />
                    </div>
                    <span
                        className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">ToyBox
                                      </span>
                </button>
                <nav className="hidden lg:flex items-center gap-1">
                    <Button variant="ghost" onClick={() => navigate("/")} className="text-gray-700">Home
</Button>
                    <div
                        className="relative"
                        onMouseEnter={() => setShowCategories(true)}
                        onMouseLeave={() => setShowCategories(false)}>
                        <Button variant="ghost" className="text-gray-700">Categories
                                              <ApperIcon name="ChevronDown" className="w-4 h-4 ml-1" />
                        </Button>
                        {showCategories && <motion.div
                            initial={{
                                opacity: 0,
                                y: 10
                            }}
                            animate={{
                                opacity: 1,
                                y: 0
                            }}
                            className={`absolute top-full left-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 p-4 grid grid-cols-2 gap-2 ${isScrolling ? "pointer-events-none" : ""}`}>
                            {categories.map(category => <button
                                key={category.name}
                                onClick={() => {
                                    navigate(`/catalog?category=${encodeURIComponent(category.name)}`);
                                    setShowCategories(false);
                                }}
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 transition-colors text-left">
                                <div
                                    className="w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <ApperIcon name={category.icon} className="w-5 h-5 text-primary" />
                                </div>
                                <span className="text-sm font-medium text-gray-900">
                                    {category.name}
                                </span>
                            </button>)}
                        </motion.div>}
                    </div>
                    <Button
                        variant="ghost"
                        onClick={() => navigate("/deals")}
                        className="text-gray-700">Deals
                                      </Button>
                    <Button
                        variant="ghost"
                        onClick={() => navigate("/orders")}
                        className="text-gray-700">Orders
                                      </Button>
                </nav>
                <div className="hidden md:block flex-1 max-w-xl mx-8">
                    <SearchBar onSearch={handleSearch} />
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => navigate("/wishlist")}
                        className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <ApperIcon name="Heart" className="w-6 h-6 text-gray-700" />
                        {wishlistCount > 0 && <span
                            className="absolute -top-1 -right-1 w-5 h-5 bg-error text-white text-xs font-bold rounded-full flex items-center justify-center">
                            {wishlistCount}
                        </span>}
                    </button>
                    <button
                        onClick={() => navigate("/cart")}
                        className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <ApperIcon name="ShoppingCart" className="w-6 h-6 text-gray-700" />
                        {cartCount > 0 && <motion.span
                            initial={{
                                scale: 0
                            }}
                            animate={{
                                scale: 1
                            }}
                            className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
                            {cartCount}
                        </motion.span>}
                    </button>
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <ApperIcon name={mobileMenuOpen ? "X" : "Menu"} className="w-6 h-6 text-gray-700" />
                    </button>
                </div>
            </div>
        </div>
        <div className="md:hidden py-3 border-t border-gray-200">
            <SearchBar onSearch={handleSearch} />
        </div>
        {mobileMenuOpen && <motion.div
            initial={{
                opacity: 0,
                height: 0
            }}
            animate={{
                opacity: 1,
                height: "auto"
            }}
            exit={{
                opacity: 0,
                height: 0
            }}
            className="lg:hidden border-t border-gray-200 bg-white">
<nav className="max-w-7xl mx-auto px-4 py-4 space-y-2">
                <Button
                    variant="ghost"
                    onClick={() => {
                        navigate("/");
                        setMobileMenuOpen(false);
                    }}
                    className="w-full justify-start text-gray-700">Home
                                </Button>
                <Button
                    variant="ghost"
                    onClick={() => {
                        navigate("/catalog");
                        setMobileMenuOpen(false);
                    }}
                    className="w-full justify-start text-gray-700">All Products
                                </Button>
                <Button
                    variant="ghost"
                    onClick={() => {
                        navigate("/deals");
                        setMobileMenuOpen(false);
                    }}
                    className="w-full justify-start text-gray-700">Deals
                                </Button>
                <Button
                    variant="ghost"
                    onClick={() => {
                        navigate("/orders");
                        setMobileMenuOpen(false);
                    }}
                    className="w-full justify-start text-gray-700">Orders
                                </Button>
                <div className="border-t border-gray-200 pt-4 mt-4">
                    <p className="text-sm text-gray-500 px-3">Categories</p>
                    {categories.map(category => <Button
                        key={category.name}
                        variant="ghost"
                        onClick={() => {
                            navigate(`/catalog?category=${encodeURIComponent(category.name)}`);
                            setMobileMenuOpen(false);
                        }}
                        className="w-full justify-start text-gray-700 gap-3">
                        <ApperIcon name={category.icon} className="w-5 h-5" />
                        {category.name}
                    </Button>)}
                </div>
            </nav>
        </motion.div>}
    </div></header>
  );
};

export default Header;