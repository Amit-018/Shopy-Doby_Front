import React, { useState,useEffect } from 'react';
import { ShoppingBagIcon, StarIcon, FilterIcon, ChevronDownIcon } from '@heroicons/react/solid';
import { useCart } from '../CartContext'; // Import the useCart hook

function New() {
    const [products, setProducts] = useState([]); // Store fetched data here
    const [sortBy, setSortBy] = useState('featured');
    const [filterCategory, setFilterCategory] = useState('All');
    const { addToCart } = useCart(); // Extract addToCart from the cart context
  
    // Fetch products from API
    useEffect(() => {
        fetch('http://localhost:5000/api/new')
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .catch((error) => console.error('Error fetching products:', error))
    }, []); // Run only once after the component mounts
  
    const filteredProducts = filterCategory === 'All'
      ? products
      : products.filter(product => product.category === filterCategory);
  
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (sortBy === 'priceLowToHigh') return a.price - b.price;
      if (sortBy === 'priceHighToLow') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // 'featured' or default
    });
      
  return (
    <>
     <div className="min-h-screen bg-gradient-to-br from-[#3b82f6] to-[#a855f7] p-8">
      <main className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">New Arrivals</h1>

        {/* Filters and Sorting */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <FilterIcon className="h-5 w-5 text-[#3b82f6] mr-2" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-gray-100 text-gray-800 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
            >
              <option value="All">All Categories</option>
              {Array.from(new Set(products.map(item => item.category))).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
            <ChevronDownIcon className="h-5 w-5 text-[#3b82f6] mr-2" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-100 text-gray-800 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
            >
              <option value="featured">Featured</option>
              <option value="priceLowToHigh">Price: Low to High</option>
              <option value="priceHighToLow">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-xl">
              <img src={product.image} alt={product.name} className=" mx-12 w-48 h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#3b82f6] mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[#a855f7] font-bold">${product.price.toFixed(2)}</span>
                  <div className="flex items-center">
                    <StarIcon className="h-5 w-5 text-yellow-400" />
                    <span className="ml-1 text-gray-600">{product.rating}</span>
                  </div>
                </div>
                <button
                 onClick={() => addToCart(product)} // Call addToCart on button click
                 className="w-full bg-gradient-to-r from-[#3b82f6] to-[#a855f7] text-white py-2 rounded-md hover:from-[#a855f7] hover:to-[#3b82f6] transition duration-300 flex items-center justify-center"
                 >
                <ShoppingBagIcon className="h-5 w-5 mr-2" />
                Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
    </>
  )
}

export default New
