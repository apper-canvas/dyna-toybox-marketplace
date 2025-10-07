import { motion } from "framer-motion";

const Loading = ({ type = "products" }) => {
  if (type === "products") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-lg shadow-card overflow-hidden"
          >
            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded animate-pulse w-3/4" />
              <div className="h-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded animate-pulse w-1/2" />
              <div className="h-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded animate-pulse w-1/3" />
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === "details") {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg animate-pulse" />
          <div className="space-y-6">
            <div className="h-8 bg-gradient-to-r from-gray-100 to-gray-200 rounded animate-pulse w-3/4" />
            <div className="h-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded animate-pulse w-1/4" />
            <div className="space-y-2">
              <div className="h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded animate-pulse w-5/6" />
              <div className="h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded animate-pulse w-4/6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default Loading;