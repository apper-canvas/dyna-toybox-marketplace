import { useState, useEffect } from "react";
import FilterSection from "@/components/molecules/FilterSection";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const ProductFilters = ({ onFilterChange, initialFilters = {} }) => {
  const [filters, setFilters] = useState({
    ageGroups: initialFilters.ageGroups || [],
    categories: initialFilters.categories || [],
    priceRange: initialFilters.priceRange || { min: 0, max: 200 },
    inStock: initialFilters.inStock || false
  });

  const ageGroups = [
    { label: "0-2 years", value: "0-2" },
    { label: "3-5 years", value: "3-5" },
    { label: "6-8 years", value: "6-8" },
    { label: "9-12 years", value: "9-12" },
    { label: "12+ years", value: "12+" }
  ];

  const categories = [
    "Action Figures & Playsets",
    "Dolls & Accessories",
    "Board Games & Puzzles",
    "Educational & STEM Toys",
    "Building & Construction",
    "Arts & Crafts",
    "Outdoor & Sports",
    "Electronic & Interactive",
    "Plush & Stuffed Animals",
    "Vehicles & Remote Control"
  ];

  useEffect(() => {
    onFilterChange(filters);
  }, [filters]);

  const handleAgeGroupToggle = (value) => {
    setFilters(prev => ({
      ...prev,
      ageGroups: prev.ageGroups.includes(value)
        ? prev.ageGroups.filter(g => g !== value)
        : [...prev.ageGroups, value]
    }));
  };

  const handleCategoryToggle = (category) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleClearAll = () => {
    setFilters({
      ageGroups: [],
      categories: [],
      priceRange: { min: 0, max: 200 },
      inStock: false
    });
  };

  const hasActiveFilters = filters.ageGroups.length > 0 || 
                          filters.categories.length > 0 || 
                          filters.inStock;

  return (
    <div className="bg-white rounded-lg shadow-card p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold text-gray-900">Filters</h2>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={handleClearAll}>
            <ApperIcon name="X" className="w-4 h-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      <FilterSection title="Age Group" defaultOpen>
        {ageGroups.map(group => (
          <label key={group.value} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.ageGroups.includes(group.value)}
              onChange={() => handleAgeGroupToggle(group.value)}
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <span className="text-gray-700">{group.label}</span>
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Category" defaultOpen>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {categories.map(category => (
            <label key={category} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.categories.includes(category)}
                onChange={() => handleCategoryToggle(category)}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <span className="text-sm text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Price Range" defaultOpen>
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <input
              type="number"
              value={filters.priceRange.min}
              onChange={(e) => setFilters(prev => ({
                ...prev,
                priceRange: { ...prev.priceRange, min: Number(e.target.value) }
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Min"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              value={filters.priceRange.max}
              onChange={(e) => setFilters(prev => ({
                ...prev,
                priceRange: { ...prev.priceRange, max: Number(e.target.value) }
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Max"
            />
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Availability" defaultOpen>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={(e) => setFilters(prev => ({ ...prev, inStock: e.target.checked }))}
            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <span className="text-gray-700">In Stock Only</span>
        </label>
      </FilterSection>
    </div>
  );
};

export default ProductFilters;