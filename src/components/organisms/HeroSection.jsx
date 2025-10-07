import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-2xl overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-5xl sm:text-6xl font-display font-bold leading-tight">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Discover
              </span>{" "}
              <span className="text-gray-900">Amazing Toys</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Find the perfect toys for every age and interest. From educational STEM kits to cuddly plush friends, we have everything to spark joy and creativity.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate("/catalog")}
              >
                Shop Now
                <ApperIcon name="ArrowRight" className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/deals")}
              >
                View Deals
                <ApperIcon name="Tag" className="w-5 h-5 ml-2" />
              </Button>
            </div>
            <div className="flex items-center gap-8 pt-4">
              <div>
                <p className="text-3xl font-display font-bold text-primary">500+</p>
                <p className="text-sm text-gray-600">Toys Available</p>
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-secondary">4.8★</p>
                <p className="text-sm text-gray-600">Average Rating</p>
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-accent">2k+</p>
                <p className="text-sm text-gray-600">Happy Customers</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <motion.img
                whileHover={{ scale: 1.05 }}
                src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400"
                alt="Colorful building blocks"
                className="rounded-2xl shadow-lg w-full h-64 object-cover"
              />
              <motion.img
                whileHover={{ scale: 1.05 }}
                src="https://images.unsplash.com/photo-1551361415-69c87624334f?w=400"
                alt="Plush teddy bear"
                className="rounded-2xl shadow-lg w-full h-64 object-cover mt-8"
              />
            </div>
            <motion.div
              animate={{ rotate: [0, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-accent to-yellow-400 rounded-full flex items-center justify-center shadow-lg"
            >
              <span className="text-2xl font-display font-bold text-gray-900">50%</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;