import React, { useEffect, useState } from 'react';
import { ShoppingCartIcon, StarIcon } from '@heroicons/react/solid';
import { useCart } from '../CartContext'; // Import the useCart hook
function Electronic() { 
    const [products, setProducts] = useState([]); 
    const { addToCart } = useCart(); // Extract addToCart from the cart context

    const backendURL =import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
    // Replace this with your local server API endpoint
    fetch(`${backendURL}/api/products`)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  console.log(products);
  
  
  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-[#3b82f6] to-[#a855f7] p-8">
      <main className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Electronic Wonderland</h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {products.map((product) => (
    <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-xl">
      {/* Rendering the product image */}
      <img 
        src={product.images} 
        alt={product.name} 
        className="mx-12 w-48 h-48 object-cover" 
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-[#3b82f6] mb-2">{product.name}</h3>
        <div className="flex justify-between items-center mb-2">
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
        <ShoppingCartIcon className="h-5 w-5 mr-2" />
        Add to Cart
        </button>
      </div>
    </div>
  ))}
</div>

        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4">Special Offers</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-[#3b82f6] mb-2">Summer Sale!</h3>
            <p className="text-gray-600 mb-4">Get up to 30% off on selected items. Limited time offer.</p>
            <button className="bg-[#a855f7] text-white py-2 px-4 rounded-md hover:bg-[#3b82f6] transition duration-300">
              Shop Now
            </button>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Free Shipping', 'Best Prices', '24/7 Support'].map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                <h3 className="text-lg font-semibold text-[#3b82f6] mb-2">{feature}</h3>
                <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
    </>
  )
}

export default Electronic
