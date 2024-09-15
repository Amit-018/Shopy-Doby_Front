import React, { useState ,useEffect} from 'react';
import {NavLink} from "react-router-dom"
import { ShoppingCartIcon, StarIcon, FilterIcon, ChevronDownIcon } from '@heroicons/react/solid';
import { useCart } from '../CartContext'; // Import the useCart hook

const HomeAndGardenPage = () => {
    const [sortBy, setSortBy] = useState('featured');
    const [filterCategory, setFilterCategory] = useState('All');
    const [homeAndGardenItems, setHomeAndGardenItems] = useState([]);
    const { addToCart } = useCart(); // Extract addToCart from the cart context

    const backendURL = process.env.REACT_APP_BACKEND_URL;
  
    useEffect(() => {
      fetch(`${backendURL}/api/home`)
        .then(response => response.json())
        .then(data => setHomeAndGardenItems(data))
        .catch(error => console.error('Error fetching data:', error));
    }, []);
  
    const filteredItems = filterCategory === 'All'
      ? homeAndGardenItems
      : homeAndGardenItems.filter(item => item.category === filterCategory);
  
    const sortedItems = [...filteredItems].sort((a, b) => {
      if (sortBy === 'priceLowToHigh') return a.price - b.price;
      if (sortBy === 'priceHighToLow') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-500 p-8">
      <main className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Home & Garden</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-blue-500 mb-4">Transform Your Space</h2>
          <p className="text-gray-600 mb-4">Discover our curated collection of home and garden essentials to elevate your living spaces...</p>
         <NavLink to="/">
         <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full font-semibold">
            Explore All Categories
          </button>
         </NavLink> 
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 mb-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <FilterIcon className="h-5 w-5 text-blue-500 mr-2" /> {/* Updated to v1 */}
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="bg-gray-100 text-gray-800 rounded-md px-2 py-1">
              <option value="All">All Categories</option>
              {Array.from(new Set(homeAndGardenItems.map(item => item.category))).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
            <ChevronDownIcon className="h-5 w-5 text-blue-500 mr-2" /> {/* Updated to v1 */}
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-gray-100 text-gray-800 rounded-md px-2 py-1">
              <option value="featured">Featured</option>
              <option value="priceLowToHigh">Price: Low to High</option>
              <option value="priceHighToLow">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-blue-500 mb-2">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{item.category}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-purple-500 font-bold">${item.price.toFixed(2)}</span>
                  <div className="flex items-center">
                    <StarIcon className="h-5 w-5 text-yellow-400" /> {/* Updated to v1 */}
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
      </main>
    </div>
      </>
    );
  };
  
  export default HomeAndGardenPage;