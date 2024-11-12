import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Shop from './pages/shop/shop';
import Home from './pages/home';
import Cart from './pages/cart/cart';
import Contact from './pages/contact/contact';
import ProductDetail from './pages/shop/ProductDetail';
import Checkout from './pages/shop/Checkout'; // Import the Checkout component
import Navbar from './components/navbar/navbar';
import ShopContextProvider from './context/shop-context';
import './App.css';

function App() {
  let disableTransitions = window.innerWidth < 768;

  return (
    <div className="App">
      <ShopContextProvider>
        <Router location={disableTransitions ? { transition: 'none' } : {}}>
          <div className="appNav">
            <Navbar />
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} /> {/* New Checkout route */}
          </Routes>
        </Router>
      </ShopContextProvider>
    </div>
  );
}

export default App;
