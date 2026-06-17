import React from 'react';
import { Category } from '../types';

interface FiltersProps {
  categories: Category[];
  selectedCategory?: number;
  minPrice?: number;
  maxPrice?: number;
  searchQuery?: string;
  onCategoryChange: (categoryId?: number) => void;
  onPriceChange: (min?: number, max?: number) => void;
  onSearchChange: (query: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  categories,
  selectedCategory,
  minPrice,
  maxPrice,
  searchQuery,
  onCategoryChange,
  onPriceChange,
  onSearchChange,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      {/* Search */}
      <div>
        <h3 className="font-bold text-lg mb-3">Search</h3>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery || ''}
          onChange={(e) => onSearchChange(e.target.value)}
          className="input"
        />
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-bold text-lg mb-3">Categories</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="category"
              checked={!selectedCategory}
              onChange={() => onCategoryChange()}
              className="w-4 h-4"
            />
            <span>All Categories</span>
          </label>
          {categories.map((category) => (
            <label key={category.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === category.id}
                onChange={() => onCategoryChange(category.id)}
                className="w-4 h-4"
              />
              <span>{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-bold text-lg mb-3">Price Range</h3>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-600">Min Price (₹)</label>
            <input
              type="number"
              placeholder="0"
              value={minPrice || ''}
              onChange={(e) =>
                onPriceChange(
                  e.target.value ? parseInt(e.target.value) : undefined,
                  maxPrice
                )
              }
              className="input"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Max Price (₹)</label>
            <input
              type="number"
              placeholder="1000000"
              value={maxPrice || ''}
              onChange={(e) =>
                onPriceChange(
                  minPrice,
                  e.target.value ? parseInt(e.target.value) : undefined
                )
              }
              className="input"
            />
          </div>
          <button
            onClick={() => onPriceChange()}
            className="w-full btn btn-outline text-sm"
          >
            Clear Price
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
