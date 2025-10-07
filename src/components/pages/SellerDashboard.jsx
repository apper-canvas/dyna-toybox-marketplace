import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import productService from "@/services/api/productService";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";

const SellerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    description: "",
    images: [],
    ageMin: "",
    ageMax: "",
    category: "",
    subcategory: "",
    material: "",
    weight: "",
    stockQuantity: "",
    isFeatured: false,
    dimensions: {
      length: "",
      width: "",
      height: ""
    }
  });

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getAll();
      setProducts(data);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        ageMin: parseInt(formData.ageMin),
        ageMax: parseInt(formData.ageMax),
        weight: parseFloat(formData.weight),
        stockQuantity: parseInt(formData.stockQuantity),
        dimensions: {
          length: parseFloat(formData.dimensions.length),
          width: parseFloat(formData.dimensions.width),
          height: parseFloat(formData.dimensions.height)
        },
        sellerId: "seller1",
        salePrice: null
      };

      if (editingProduct) {
        await productService.update(editingProduct.Id, productData);
        toast.success("Product updated successfully!");
      } else {
        await productService.create(productData);
        toast.success("Product created successfully!");
      }

      setShowForm(false);
      setEditingProduct(null);
      resetForm();
      loadProducts();
    } catch (err) {
      toast.error("Failed to save product");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      brand: product.brand,
      price: product.price.toString(),
      description: product.description,
      images: product.images,
      ageMin: product.ageMin.toString(),
      ageMax: product.ageMax.toString(),
      category: product.category,
      subcategory: product.subcategory,
      material: product.material,
      weight: product.weight.toString(),
      stockQuantity: product.stockQuantity.toString(),
      isFeatured: product.isFeatured,
      dimensions: {
        length: product.dimensions.length.toString(),
        width: product.dimensions.width.toString(),
        height: product.dimensions.height.toString()
      }
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    
    try {
      await productService.delete(id);
      toast.success("Product deleted successfully!");
      loadProducts();
    } catch (err) {
      toast.error("Failed to delete product");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      brand: "",
      price: "",
      description: "",
      images: [],
      ageMin: "",
      ageMax: "",
      category: "",
      subcategory: "",
      material: "",
      weight: "",
      stockQuantity: "",
      isFeatured: false,
      dimensions: {
        length: "",
        width: "",
        height: ""
      }
    });
  };

  const handleImageUrlAdd = () => {
    const url = prompt("Enter image URL:");
    if (url) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, url]
      }));
    }
  };

  const handleImageRemove = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadProducts} />;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
            Seller Dashboard
          </h1>
          <p className="text-gray-600">Manage your toy listings</p>
        </div>
        <Button
          variant="primary"
          onClick={() => {
            setShowForm(!showForm);
            setEditingProduct(null);
            resetForm();
          }}
        >
          <ApperIcon name={showForm ? "X" : "Plus"} className="w-5 h-5 mr-2" />
          {showForm ? "Cancel" : "Add Product"}
        </Button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-card p-6"
        >
          <h2 className="text-xl font-display font-bold text-gray-900 mb-6">
            {editingProduct ? "Edit Product" : "Add New Product"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand
                </label>
                <Input
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price ($)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stock Quantity
                </label>
                <Input
                  type="number"
                  value={formData.stockQuantity}
                  onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age Min (years)
                </label>
                <Input
                  type="number"
                  value={formData.ageMin}
                  onChange={(e) => setFormData({ ...formData, ageMin: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age Max (years)
                </label>
                <Input
                  type="number"
                  value={formData.ageMax}
                  onChange={(e) => setFormData({ ...formData, ageMax: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Action Figures & Playsets">Action Figures & Playsets</option>
                  <option value="Dolls & Accessories">Dolls & Accessories</option>
                  <option value="Board Games & Puzzles">Board Games & Puzzles</option>
                  <option value="Educational & STEM Toys">Educational & STEM Toys</option>
                  <option value="Building & Construction">Building & Construction</option>
                  <option value="Arts & Crafts">Arts & Crafts</option>
                  <option value="Outdoor & Sports">Outdoor & Sports</option>
                  <option value="Electronic & Interactive">Electronic & Interactive</option>
                  <option value="Plush & Stuffed Animals">Plush & Stuffed Animals</option>
                  <option value="Vehicles & Remote Control">Vehicles & Remote Control</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Material
                </label>
                <Input
                  value={formData.material}
                  onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight (lbs)
                </label>
                <Input
                  type="number"
                  step="0.1"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dimensions (inches)
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="Length"
                    value={formData.dimensions.length}
                    onChange={(e) => setFormData({
                      ...formData,
                      dimensions: { ...formData.dimensions, length: e.target.value }
                    })}
                    required
                  />
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="Width"
                    value={formData.dimensions.width}
                    onChange={(e) => setFormData({
                      ...formData,
                      dimensions: { ...formData.dimensions, width: e.target.value }
                    })}
                    required
                  />
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="Height"
                    value={formData.dimensions.height}
                    onChange={(e) => setFormData({
                      ...formData,
                      dimensions: { ...formData.dimensions, height: e.target.value }
                    })}
                    required
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Images
                </label>
                <div className="space-y-2">
                  {formData.images.map((url, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input value={url} readOnly className="flex-1" />
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => handleImageRemove(index)}
                      >
                        <ApperIcon name="X" className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleImageUrlAdd}
                  >
                    <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
                    Add Image URL
                  </Button>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Mark as Featured Product
                  </span>
                </label>
              </div>
            </div>

            <div className="flex gap-3">
              <Button type="submit" variant="primary" className="flex-1">
                <ApperIcon name="Save" className="w-5 h-5 mr-2" />
                {editingProduct ? "Update Product" : "Create Product"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  setEditingProduct(null);
                  resetForm();
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="bg-white rounded-lg shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.Id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500">{product.brand}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${product.price.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${
                      product.stockQuantity === 0 ? "text-error" :
                      product.stockQuantity <= 10 ? "text-warning" :
                      "text-success"
                    }`}>
                      {product.stockQuantity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-primary hover:text-primary/80 transition-colors"
                      >
                        <ApperIcon name="Edit" className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.Id)}
                        className="text-error hover:text-error/80 transition-colors"
                      >
                        <ApperIcon name="Trash2" className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;