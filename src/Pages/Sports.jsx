import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { ShoppingCartIcon, StarIcon, FilterIcon, ChevronDownIcon } from '@heroicons/react/solid';
import { useCart } from '../CartContext'; // Import the useCart hook

function Sports() {
  const [sortBy, setSortBy] = useState('featured');
  const [filterCategory, setFilterCategory] = useState('All');
  const [sportsAndOutdoorItems, setSportsAndOutdoorItems] = useState([]);
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const { addToCart } = useCart(); // Extract addToCart from the cart context

  useEffect(() => {
    fetch(`${backendURL}/api/sports`)
      .then(response => response.json())
      .then(data => setSportsAndOutdoorItems(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const filteredItems = filterCategory === 'All'
    ? sportsAndOutdoorItems
    : sportsAndOutdoorItems.filter(item => item.category === filterCategory);

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'priceLowToHigh') return a.price - b.price;
    if (sortBy === 'priceHighToLow') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#3b82f6] to-[#a855f7] p-8">
        <main className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">Sports & Outdoor</h1>
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold text-[#3b82f6] mb-4">Gear Up for Adventure</h2>
            <p className="text-gray-600 mb-4">
              Discover our wide range of sports equipment and outdoor gear. Whether you're hitting the trails, the court, or the gym, we've got everything you need to stay active and enjoy the great outdoors.
            </p>
            <NavLink to="/">
              <button className="bg-gradient-to-r from-[#3b82f6] to-[#a855f7] text-white px-6 py-2 rounded-full font-semibold hover:from-[#a855f7] hover:to-[#3b82f6] transition duration-300">
                Explore All Categories
              </button>
            </NavLink>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 mb-8 flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center mb-4 sm:mb-0">
              <FilterIcon className="h-5 w-5 text-[#3b82f6] mr-2" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-gray-100 text-gray-800 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
              >
                <option value="All">All Categories</option>
                {Array.from(new Set(sportsAndOutdoorItems.map(item => item.category))).map(category => (
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-xl">
                <img src={item.image} alt={item.name} className="mx-12 w-48 h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[#3b82f6] mb-2">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{item.category}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[#a855f7] font-bold">${item.price.toFixed(2)}</span>
                    <div className="flex items-center">
                      <StarIcon className="h-5 w-5 text-yellow-400" />
                      <span className="ml-1 text-gray-600">{item.rating}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => addToCart(item)} // Call addToCart on button click
                    className="w-full bg-gradient-to-r from-[#3b82f6] to-[#a855f7] text-white py-2 rounded-md hover:from-[#a855f7] hover:to-[#3b82f6] transition duration-300 flex items-center justify-center"
                  >
                    <ShoppingCartIcon className="h-5 w-5 mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white rounded-lg shadow-xl p-8 text-center">
            <h2 className="text-2xl font-semibold text-[#3b82f6] mb-4">Stay Active, Stay Informed</h2>
            <p className="text-gray-600 mb-6">Subscribe to our newsletter for the latest product updates, fitness tips, and exclusive offers!</p>
            <div className="flex max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#3b82f6] border-t border-b border-l"
              />
              <button className="bg-gradient-to-r from-[#3b82f6] to-[#a855f7] text-white px-6 py-2 rounded-r-md font-semibold hover:from-[#a855f7] hover:to-[#3b82f6] transition duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Sports;
