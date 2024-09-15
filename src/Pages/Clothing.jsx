import React ,{useEffect,useState} from 'react'
import { ShoppingBagIcon, StarIcon, TruckIcon, ShieldCheckIcon, CurrencyDollarIcon } from '@heroicons/react/solid';
import Shopping from "../assets/Shopping.jpg"
import { useCart } from '../CartContext'; // Import the useCart hook

function Clothing() {
  const [products, setProducts] = useState([]); 
  const { addToCart } = useCart(); // Extract addToCart from the cart context

  const backendURL = process.env.REACT_APP_BACKEND_URL;
  

  useEffect(() => {
  // Replace this with your local server API endpoint
  fetch(`${backendURL}/api/clothing`)
    .then((response) => response.json())
    .then((data) => setProducts(data))
    .catch((error) => console.error('Error fetching products:', error));
}, []);

console.log(products);

  return (
    <>
       <div className="min-h-screen bg-gradient-to-br from-[#3b82f6] to-[#a855f7] p-8">
      <main className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Shopy-Doby Clothing</h1>
        
        {/* Hero Section */}
        <section className="bg-white rounded-lg shadow-xl overflow-hidden mb-12">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-[#3b82f6] mb-4">Summer Collection 2023</h2>
              <p className="text-gray-600 mb-6">Discover the latest trends and styles for your perfect summer look.</p>
              <button className="bg-gradient-to-r w-40 h-10 from-[#3b82f6] to-[#a855f7] text-white py-2 px-6 rounded-full font-semibold hover:from-[#a855f7] hover:to-[#3b82f6] transition duration-300 inline-flex items-center">
                Shop Now
                <ShoppingBagIcon className="h-5 w-5 ml-2" />
              </button>
            </div>
            <div className="md:w-1/2">
              <img src={Shopping} alt="Summer Collection" className="w-full h-60  object-cover opacity-85" />
            </div>
          </div>
        </section>
        
        {/* Featured Products */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
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
        
        {/* Features Section */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-[#3b82f6] mb-6 text-center">Why Choose Shopy-Doby?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: TruckIcon, title: 'Free Shipping', description: 'On orders over $50' },
                { icon: ShieldCheckIcon, title: 'Secure Payments', description: '100% secure transactions' },
                { icon: CurrencyDollarIcon, title: 'Money-Back Guarantee', description: '30-day return policy' },
              ].map((feature, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <feature.icon className="h-12 w-12 text-[#a855f7] mb-4" />
                  <h3 className="text-lg font-semibold text-[#3b82f6] mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section>
          <div className="bg-gradient-to-r from-[#3b82f6] to-[#a855f7] rounded-lg shadow-xl p-8 text-white">
            <h2 className="text-2xl font-semibold mb-4 text-center">Subscribe to Our Newsletter</h2>
            <p className="text-center mb-6">Get the latest updates on new products and upcoming sales.</p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white text-gray-800"
              />
              <button
                type="submit"
                className="bg-white text-[#3b82f6] px-6 py-2 rounded-md font-semibold hover:bg-gray-100 transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
    </>
  )
}

export default Clothing
