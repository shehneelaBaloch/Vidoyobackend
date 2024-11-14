import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../../context/shop-context';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, products } = useContext(ShopContext);
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    address: ''
  });

  useEffect(() => {
    const cartItemsList = products
      .filter(product => cartItems[product.id] > 0)
      .map(product => ({ ...product, quantity: cartItems[product.id] }));
    setCheckoutItems(cartItemsList);
    const total = cartItemsList.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalAmount(total);
  }, [cartItems, products]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));  // Clear error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderData = { ...formData, items: checkoutItems, totalAmount };
    
    try {
      const response = await fetch('http://localhost:5000/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to place order');
    }
  };

  return (
    <div className='checkout'>
      <h1>Checkout</h1>
      <div className='checkout-items'>
        <h2>Order Summary</h2>
        {checkoutItems.map(item => (
          <div key={item.id} className='checkout-item'>
            <p>{item.productName} - Quantity: {item.quantity}</p>
          </div>
        ))}
        <p>Total Amount: Rs.{totalAmount.toFixed(2)}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type='text' name='name' value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type='email' name='email' value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Phone Number:
          <input type='tel' name='number' value={formData.number} onChange={handleChange} required />
        </label>
        <label>
          Address:
          <textarea name='address' rows='3' value={formData.address} onChange={handleChange} required />
        </label>
        <button type='submit'>Confirm Order</button>
      </form>
    </div>
  );
};

export default Checkout;
