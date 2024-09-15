import React, { useState, useEffect } from 'react';
import { MenuIcon, ChevronDownIcon, SearchIcon, ShoppingCartIcon, UserIcon, LogoutIcon } from "@heroicons/react/outline";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from '../CartContext'; // Importing the useCart hook to access cart items
import axios from 'axios';
import logo from "../assets/logo.png"

function Nav() {
  const { cartItems } = useCart(); // Access cart items from the context
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [name, setFullname] = useState('');
  const navigate = useNavigate();
  
  // Function to toggle the user dropdown
  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  // Fetch user data when the component mounts (if logged in)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const res = await axios.get('http://localhost:5000/users/me', {
            headers: { 'Authorization': `Bearer ${token}` },
          });
          setFullname(res.data.name);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem('token');
    setFullname(''); // Clear user data
    alert('Logged out successfully');
    navigate('/login'); // Redirect to login page
  };

  // Check if the user is authenticated (based on token presence)
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <>
      <div className="bg-gray-50 flex flex-col">
        <header className="sticky top-0 z-10 bg-white border-b">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center">
            <img src={logo} style={{height:"40px", paddingLeft:"0px"}}/>
              <MenuIcon className="h-6 w-6 mr-2 md:hidden" />
              <h1 className="text-2xl font-bold text-blue-600">Shopy-Doby</h1>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex space-x-4">
              <NavLink to="/" className="text-gray-600 hover:text-blue-600">Home</NavLink>
              <div className="relative group">
                <button className="flex items-center text-gray-600 hover:text-blue-600">
                  Categories <ChevronDownIcon className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border rounded-md shadow-lg hidden group-hover:block">
                  <NavLink to="/Electronic" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Electronics</NavLink>
                  <NavLink to="/Clothing" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Clothing</NavLink>
                  <NavLink to="/home" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Home & Garden</NavLink>
                  <NavLink to="/sports" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sports & Outdoors</NavLink>
                </div>
              </div>
              <NavLink to="/New" className="text-gray-600 hover:text-blue-600">New Arrivals</NavLink>
              <NavLink to="/Sale" className="text-gray-600 hover:text-blue-600">Sale</NavLink>
              <NavLink to="/About" className="text-gray-600 hover:text-blue-600">About</NavLink>
              <NavLink to="/Contact" className="text-gray-600 hover:text-blue-600">Contact</NavLink>
            </nav>

            {/* Search, Cart, and User Section */}
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              {/* <div className="relative hidden md:block">
                <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input type="search" placeholder="Search..." className="pl-8 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div> */}

              {/* Cart Icon */}
              <NavLink to="/cart" className="relative">
                <ShoppingCartIcon className="h-5 w-5 text-gray-600 hover:text-blue-600" />
                <span className="sr-only">Cart</span>
                {cartItems.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </NavLink>

              {/* User Dropdown */}
              <div className="relative">
  <button
    onClick={toggleUserDropdown}
    className="flex items-center text-gray-600 hover:text-blue-600 focus:outline-none relative"
  >
    <UserIcon className="h-5 w-5" />
    {isAuthenticated && (
      <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-600"></span>
    )}
  </button>
  {isUserDropdownOpen && (
    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
      {isAuthenticated ? (
        <>
          <div className="px-4 py-2 text-sm text-gray-700 border-b">
            {name}
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <LogoutIcon className="h-4 w-4 mr-2" />
            Log Out
          </button>
        </>
      ) : (
        <>
          <NavLink
            to="/login"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Log In
          </NavLink>
          <NavLink
            to="/signup"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Sign Up
          </NavLink>
        </>
      )}
    </div>
  )}
</div>
</div>


          </div>
        </header>
      </div>
    </>
  );
}

export default Nav;
