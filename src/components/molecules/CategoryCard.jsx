import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";

const categoryIcons = {
  "Action Figures & Playsets": "Sword",
  "Dolls & Accessories": "Baby",
  "Board Games & Puzzles": "Puzzle",
  "Educational & STEM Toys": "GraduationCap",
  "Building & Construction": "Blocks",
  "Arts & Crafts": "Palette",
  "Outdoor & Sports": "Bike",
  "Electronic & Interactive": "Gamepad2",
  "Plush & Stuffed Animals": "Heart",
  "Vehicles & Remote Control": "Car"
};

const CategoryCard = ({ category, count }) => {
  const navigate = useNavigate();
  const icon = categoryIcons[category] || "Package";

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate(`/catalog?category=${encodeURIComponent(category)}`)}
      className="bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-card hover:shadow-card-hover p-6 cursor-pointer border border-gray-100"
    >
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
          <ApperIcon name={icon} className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-gray-900 mb-1">
            {category}
          </h3>
          <p className="text-sm text-gray-600">{count} toys</p>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryCard;