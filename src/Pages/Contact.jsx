import React, { useState } from 'react';
import { LocationMarkerIcon, PhoneIcon, MailIcon } from '@heroicons/react/solid'; // Heroicons v1 import

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the form data to a server
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3b82f6] to-[#a855f7] p-8 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden max-w-4xl w-full">
        <div className="md:flex">
          <div className="md:w-1/2 p-8">
            <h2 className="text-3xl font-bold text-[#3b82f6] mb-6">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
                  required
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#3b82f6] to-[#a855f7] text-white py-2 px-4 rounded-md hover:from-[#a855f7] hover:to-[#3b82f6] transition duration-300 font-semibold"
              >
                Send Message
              </button>
            </form>
          </div>
          <div className="md:w-1/2 bg-gradient-to-br from-[#3b82f6] to-[#a855f7] p-8 text-white">
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            <div className="space-y-4">
              <p className="flex items-start">
                <LocationMarkerIcon className="h-6 w-6 mr-2 flex-shrink-0" />
                <span>Delhi,India</span>
              </p>
              <p className="flex items-center">
                <PhoneIcon className="h-6 w-6 mr-2" />
                <span>+91 9888888888</span>
              </p>
              <p className="flex items-center">
                <MailIcon className="h-6 w-6 mr-2" />
                <span>contact@ecommerce-example.com</span>
              </p>
            </div>
            {/* <div className="mt-8">
              <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="bg-white text-[#3b82f6] p-2 rounded-full hover:bg-opacity-80 transition duration-300"
                  >
                    {social[0]}
                  </a>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
