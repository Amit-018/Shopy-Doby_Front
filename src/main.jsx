import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Layout from './Layout.jsx';
import Home from './Home/Home.jsx';
import About from './Pages/About.jsx';
import Electronic from './Pages/Electronic.jsx';
import Clothing from './Pages/Clothing.jsx';
import New from './Pages/New.jsx';
import Contact from './Pages/Contact.jsx';
import Sale from './Pages/Sale.jsx';
import HomeAndGardenPage from './Pages/HomeGarden.jsx';
import Sports from './Pages/Sports.jsx';
import { CartProvider } from './CartContext.jsx';
import Cart from './Pages/Cart.jsx';
import Login from "./Pages/Login.jsx"
import Signup from "./Pages/Signup.jsx"

// Define the router with all the necessary routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/electronic" element={<Electronic />} />
      <Route path="/clothing" element={<Clothing />} />
      <Route path="/new" element={<New />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/sale" element={<Sale />} />
      <Route path="/home" element={<HomeAndGardenPage />} />
      <Route path="/sports" element={<Sports />} />
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/login'element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
    </Route>
  )
);

// Wrap RouterProvider inside CartProvider
createRoot(document.getElementById('root')).render(
  <CartProvider>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </CartProvider>
);
