import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './cart.css';
import { ShopContext } from '../../context/shop-context';
import { PRODUCT_LIST } from '../shop/products';
import CartItem from './cart-item';

const Cart = () => {
  const { cartItems } = useContext(ShopContext);
  const navigate = useNavigate(); // Initialize navigate for routing
  const totalAmount = PRODUCT_LIST.reduce(
    (total, product) => total + (cartItems[product.id] > 0 ? product.price * cartItems[product.id] : 0),
    0
  );

  return (
    <div className='cart'>
      <h1>Shopping Cart</h1>
      <div className='cartTable'>
        <div className='cartHeader'>
          <div>Product</div>
          <div>Price</div>
          <div>Quantity</div>
          <div>Total</div>
        </div>
        {PRODUCT_LIST.map((product) => {
          if (cartItems[product.id] > 0) {
            return <CartItem key={product.id} data={product} quantity={cartItems[product.id]} />;
          }
          return null;
        })}
        <div className='cartFooter'>
          <div className='totalLabel'>Total Amount:</div>
          <div className='totalAmount'>Rs.{totalAmount.toFixed(2)}</div>
        </div>
      </div>
      <button className='checkoutButton' onClick={() => navigate('/checkout')}>
        Proceed to Checkout
      </button> {/* Added navigate to /checkout on button click */}
    </div>
  );
};

export default Cart;
