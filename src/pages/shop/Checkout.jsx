import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../../context/shop-context';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, products } = useContext(ShopContext);
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    number: '',
    address: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    number: '',
    address: '',
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const directProductId = urlParams.get('productId');

    if (directProductId) {
      const product = products.find(item => item.id === parseInt(directProductId, 10));
      if (product) {
        setCheckoutItems([{ ...product, quantity: 1 }]);
        setTotalAmount(product.price);
      }
    } else {
      const cartItemsList = products
        .filter(product => cartItems[product.id] > 0)
        .map(product => ({ ...product, quantity: cartItems[product.id] }));
      setCheckoutItems(cartItemsList);
      const total = cartItemsList.reduce((sum, item) => sum + item.price * item.quantity, 0);
      setTotalAmount(total);
    }
  }, [cartItems, products]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));  // Clear error on change
  };

  const validateInputs = () => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const pakistaniPhoneRegex = /^03\d{9}$/;
    const addressMinLength = 10;

    const newErrors = {
      name: !nameRegex.test(userDetails.name) ? 'Name should only contain alphabets and spaces.' : '',
      email: !gmailRegex.test(userDetails.email) ? 'Please enter a valid Gmail address ending with @gmail.com.' : '',
      number: !pakistaniPhoneRegex.test(userDetails.number) ? 'Phone number must start with 03 and be exactly 11 digits.' : '',
      address: userDetails.address.length < addressMinLength ? 'Address must contain at least 10 characters.' : '',
    };

    setErrors(newErrors);

    // Return true if there are no errors
    return Object.values(newErrors).every(error => error === '');
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    const orderData = {
      items: checkoutItems,
      totalAmount,
      userDetails,
    };

    try {
      const response = await fetch('http://localhost:5000/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      const result = await response.json();
      
      if (response.ok) {
        alert('Order placed successfully!');
      } else {
        console.error(result.message);
        alert('Failed to place the order: ' + (result.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An error occurred while placing the order. Please try again later.');
    }
  };

  return (
    <div className='checkout'>
      <h1>Checkout</h1>
      <div className='checkout-items'>
        <h2>Order Summary</h2>
        <div className='items-list'>
          {checkoutItems.map(item => (
            <div key={item.id} className='checkout-item'>
              <div className='item-details'>
                <img src={item.productImage} alt={item.productName} className='item-image' />
                <div>
                  <p className='item-name'>{item.productName}</p>
                  <p className='item-price'>Rs.{item.price}</p>
                  <p className='item-quantity'>Quantity: {item.quantity}</p>
                </div>
              </div>
              <p className='item-total'>Total: Rs.{(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div className='total-amount'>
          <p><strong>Total Amount:</strong> Rs.{totalAmount.toFixed(2)}</p>
        </div>
      </div>

      <div className='checkout-form'>
        <h2>Billing Information</h2>
        <form onSubmit={handleOrderSubmit}>
          <label>
            Name:
            <input type='text' name='name' required value={userDetails.name} onChange={handleInputChange} />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </label>
          <label>
            Email:
            <input type='email' name='email' required value={userDetails.email} onChange={handleInputChange} />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </label>
          <label>
            Phone Number:
            <input type='tel' name='number' required value={userDetails.number} onChange={handleInputChange} />
            {errors.number && <p className="error-message">{errors.number}</p>}
          </label>
          <label>
            Address:
            <textarea name='address' rows='3' required value={userDetails.address} onChange={handleInputChange}></textarea>
            {errors.address && <p className="error-message">{errors.address}</p>}
          </label>
          <label>
            Delivery Method:
            <input type='text' value='Cash on Delivery' readOnly />
          </label>
          <button type='submit' className='submit-btn'>Confirm Order</button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;