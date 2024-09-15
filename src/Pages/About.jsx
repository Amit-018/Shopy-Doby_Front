import React from 'react';
import { ShieldCheckIcon, CurrencyRupeeIcon, TruckIcon, UserGroupIcon } from '@heroicons/react/solid';
import {NavLink} from "react-router-dom"

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3b82f6] to-[#a855f7] p-8">
      <main className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-4xl font-bold text-center text-[#3b82f6] mb-8">About Shopy-Doby</h1>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-[#a855f7] mb-4">Our Story</h2>
            <p className="text-gray-700 mb-4">
              Founded in 2015, Shopy-Doby has quickly become one of India's leading e-commerce platforms. Our journey began with a simple idea: to provide Indian consumers with a seamless online shopping experience that combines quality products, competitive prices, and exceptional customer service.
            </p>
            <p className="text-gray-700">
              Over the years, we've grown from a small startup to a trusted name in the e-commerce industry, serving millions of customers across India. Our success is built on our commitment to innovation, customer satisfaction, and our deep understanding of the Indian market.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-[#a855f7] mb-4">What Sets Us Apart</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <CurrencyRupeeIcon className="h-8 w-8 text-[#3b82f6] mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Fast Transactions</h3>
                  <p className="text-gray-700">Our advanced payment system ensures quick and secure transactions, so you can complete your purchase in seconds.</p>
                </div>
              </div>
              <div className="flex items-start">
                <ShieldCheckIcon className="h-8 w-8 text-[#3b82f6] mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">30-Day Money-Back Guarantee</h3>
                  <p className="text-gray-700">We stand behind our products. If you're not satisfied, return your purchase within 30 days for a full refund.</p>
                </div>
              </div>
              <div className="flex items-start">
                <TruckIcon className="h-8 w-8 text-[#3b82f6] mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
                  <p className="text-gray-700">With our extensive logistics network, we ensure your orders reach you quickly and in perfect condition.</p>
                </div>
              </div>
              <div className="flex items-start">
                <UserGroupIcon className="h-8 w-8 text-[#3b82f6] mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Customer-Centric Approach</h3>
                  <p className="text-gray-700">Our dedicated support team is always ready to assist you, ensuring a smooth shopping experience from start to finish.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-[#a855f7] mb-4">Our Expertise</h2>
            <p className="text-gray-700 mb-4">
              With over 8 years of experience in the e-commerce industry, Shopy-Doby has developed a deep understanding of online retail and consumer behavior in India. Our team of experts constantly works on improving our platform, curating the best products, and optimizing our services to meet the evolving needs of our customers.
            </p>
            <p className="text-gray-700">
              We've successfully processed millions of orders, partnered with thousands of sellers, and built a loyal customer base across the country. Our expertise in technology, logistics, and customer service allows us to provide a shopping experience that's second to none.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#a855f7] mb-4">Our Vision</h2>
            <p className="text-gray-700">
              At Shopy-Doby, we envision a future where online shopping is accessible, enjoyable, and trustworthy for every Indian consumer. We're committed to continuous innovation, expanding our product range, and enhancing our services to make Shopy-Doby the go-to destination for all your shopping needs.
            </p>
          </section>
        </div>

        <div className="bg-gradient-to-r from-[#3b82f6] to-[#a855f7] p-8 text-white text-center">
          <h2 className="text-2xl font-semibold mb-4">Join the Shopy-Doby Family</h2>
          <p className="mb-6">Experience the best of online shopping with Shopy-Doby. We're more than just an e-commerce platform; we're your trusted shopping partner.</p>
          <NavLink to="/"><button className="bg-white text-[#3b82f6] px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition duration-300">
            Start Shopping Now
          </button></NavLink>
        </div>
      </main>
    </div>
  );
};

export default AboutUsPage;
