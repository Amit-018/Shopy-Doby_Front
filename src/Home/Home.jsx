import React, { useState,useEffect } from 'react'

  import { ShoppingBagIcon, StarIcon } from '@heroicons/react/solid';
  import {NavLink} from "react-router-dom"
import shopping from "../assets/Shopping.jpg"
import Decor from "../assets/Decor.jpg"
import Clothing from "../assets/Clothing.jpg"
import electric from "../assets/electric.jpg"
import Sports from "../assets/Sports.jpg"
import person1 from "../assets/person1.jpg"
import person2 from "../assets/person2.jpg"

import { useCart } from '../CartContext'; // Import the useCart hook



function Home() {
  const [products ,setproducts] =useState([])
  const [items,setitems] =useState([])

  const backendURL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    // Replace this with your local server API endpoint
    fetch(`${backendURL}/api/products`)
      .then((response) => response.json())
      .then((data) => setproducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);
  useEffect(() => {
    // Replace this with your local server API endpoint
    fetch('http://localhost:5000/api/clothing')
      .then((response) => response.json())
      .then((data) => setitems(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const { addToCart } = useCart(); 
  return (
    <>
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white">
            <div className="flex flex-col md:flex-row items-center justify-between p-6">
              <div className="mb-4 md:mb-0 md:mr-6">
                <h2 className="text-3xl font-bold mb-2">Summer Collection</h2>
                <p className="mb-4">
                  Discover our latest arrivals for the season
                </p>
                <button className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100">
                  Shop Now
                </button>
              </div>
              <img
                src={shopping}
                alt="Featured Product"
                className="rounded-lg w-full h-full object-cover max-w-sm z-auto opacity-85"
              />
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Electronics",
              "Clothing",
              "Home & Garden",
              "Sports & Outdoors",
            ].map((category) => (
              <div
                key={category}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow caret-purple-400"
              >
                <div className="p-4 text-center">
                
                <NavLink to={
                category === "Electronics"
                ? "/Electronic"
                : category === "Home & Garden"
                ? "/home-garden"
                : category === "Clothing"
                ? "/clothing"
                : "/sports" // default case for Sports
                }>
                  <img
                    src={category==="Electronics"
                    ?electric
                    :category==="Home & Garden"
                    ?Decor
                    :category==="Clothing"
                    ?Clothing
                    :Sports}

                    alt={category}
                    className="w-54 h-40 mx-auto mb-2 border rounded-lg"
                  />
                  </NavLink>
                
                  <h3 className="font-semibold">{category}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-black mb-4 text-center">Electronics</h2>
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
        <ShoppingBagIcon className="h-5 w-5 mr-2" />
        Add to Cart
        </button>
      </div>
    </div>
  ))}
</div>

        </section>


        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-black mb-6 text-center">Clothing</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-xl">
                <img src={product.image} alt={product.name} className="w-2/3 h-56 object-cover rounded-lg mx-auto" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[#3b82f6] mb-2">{product.name}</h3>
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
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Customer Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2,3,4].map((testimonial) => (
              <div key={testimonial} className="bg-white rounded-lg shadow-md">
                <div className="p-6">
                  <p className="italic mb-4">
                  {testimonial===1
                  ?"Shoby-Doby Is the best to Shop from"
                  :testimonial===2
                  ?"Leave Amazon , Flipkart Come to this Platform"
                  :testimonial===3
                  ?"If you are thinking Shopping then you are thinking About Shoby-Doby"
                  :"Shoby-Doby provides the best Platform"
                  }
                  </p>
                  <div className="flex items-center">
                    <img
                      src={
                        testimonial===1
                        ?person1
                        :testimonial===2
                        ?person2
                        :testimonial===3
                        ?person2
                        :person1
                      }
                      alt="User"
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h3 className="font-semibold">
                        Happy Customer {testimonial}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Loyal shopper since 2020
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}

export default Home
