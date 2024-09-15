import React, { useState, useEffect } from 'react';
import { LockClosedIcon, StarIcon, FireIcon, TagIcon } from '@heroicons/react/solid';

function Sale() {
  const [sortBy, setSortBy] = useState('discount');
  const [saleItems, setSaleItems] = useState([]);

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  // Set the target time to 300 days, 52 minutes, and 45 seconds from now
  const targetTime = new Date().getTime() + (300 * 24 * 60 * 60 * 1000) + (52 * 60 * 1000) + (45 * 1000);

  // Calculate time left until the target time
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetTime - now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // Update the countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on unmount
  }, []);

  // Fetch sale items from the API
  useEffect(() => {
    fetch(`${backendURL}/api/sale`)
      .then((response) => response.json())
      .then((data) => setSaleItems(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  // Sort sale items based on selected criteria
  const sortedItems = [...saleItems].sort((a, b) => {
    if (sortBy === 'priceAsc') return a.salePrice - b.salePrice;
    if (sortBy === 'priceDesc') return b.salePrice - a.salePrice;
    if (sortBy === 'discount') return b.discount - a.discount;
    return 0;
  });

  // Handle Add to Cart button click (with alert)
  const handleAddToCart = () => {
    alert('Items Only Available In Sale, Kindly Wait for the Start of the Sale');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3b82f6] to-[#a855f7] p-8">
      <main className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Upcoming Flash Sale!</h1>
          <h1 className='text-2xl font-bold text-white mb-4'>Countdown Timer</h1>
          <div className="timer bg-red-500 text-white font-bold text-lg p-4 rounded-md text-center inline-block">
            <span>{timeLeft.days || 0}d : </span>
            <span>{timeLeft.hours || 0}h : </span>
            <span>{timeLeft.minutes || 0}m : </span>
            <span>{timeLeft.seconds || 0}s</span>
          </div>

          <p className="text-xl text-white mt-4">Incredible deals up to 40% off. Limited time only!</p>
        </div>

        {/* Sorting Dropdown */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8 flex justify-between items-center">
          <div className="flex items-center">
            <FireIcon className="h-6 w-6 text-red-500 mr-2" />
            <span className="text-lg font-semibold">Hot Deals</span>
          </div>
          <div className="flex items-center">
            <label htmlFor="sort" className="mr-2 text-gray-700">Sort by:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-100 text-gray-800 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
            >
              <option value="discount">Biggest Discount</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Sale Items List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-xl">
              <div className="relative">
                <img src={item.image} alt={item.name} className="mx-auto w-48 h-48 object-cover" />
                <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-bl-lg">
                  {item.discount}% OFF
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#3b82f6] mb-2">{item.name}</h3>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="text-[#a855f7] font-bold text-xl">
                      ${item.salePrice ? item.salePrice.toFixed(2) : 'N/A'}
                    </span>
                    <span className="text-gray-500 line-through ml-2">
                      ${item.originalPrice ? item.originalPrice.toFixed(2) : 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <StarIcon className="h-5 w-5 text-yellow-400" />
                    <span className="ml-1 text-gray-600">{item.rating}</span>
                  </div>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-[#3b82f6] to-[#a855f7] text-white py-2 rounded-md hover:from-[#a855f7] hover:to-[#3b82f6] transition duration-300 flex items-center justify-center"
                >
                  <LockClosedIcon className="h-5 w-5 mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Special Offer Section */}
        <div className="mt-12 bg-white rounded-lg shadow-xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-[#3b82f6] mb-4">Limited Time Offer</h2>
          <p className="text-gray-600 mb-6">
            Use coupon code <span className="font-bold text-[#a855f7]">FLASH25</span> at checkout for an extra 25% off!
          </p>
          <button className="bg-gradient-to-r from-[#3b82f6] to-[#a855f7] text-white px-6 py-3 rounded-md font-semibold hover:from-[#a855f7] hover:to-[#3b82f6] transition duration-300 flex items-center justify-center mx-auto">
            <TagIcon className="h-5 w-5 mr-2" />
            Shop Now
          </button>
        </div>
      </main>
    </div>
  );
}

export default Sale;
