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
        phoneNumber: '',
        address: '',
    });
    const [errors, setErrors] = useState({});

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
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validateForm = () => {
        const newErrors = {};
        const nameRegex = /^[A-Za-z\s]+$/;
        const gmailRegex = /^[^\s@]+@gmail\.com$/;
        const phoneRegex = /^03\d{9}$/;

        if (!nameRegex.test(userDetails.name)) {
            newErrors.name = 'Name should contain only alphabets and spaces';
        }

        if (!gmailRegex.test(userDetails.email)) {
            newErrors.email = 'Email must be a valid Gmail address ending with @gmail.com';
        }

        if (!phoneRegex.test(userDetails.phoneNumber)) {
            newErrors.phoneNumber = 'Phone number must be a valid Pakistani number (11 digits starting with 03)';
        }

        if (userDetails.address.trim().length < 5) {
            newErrors.address = 'Address should be at least 5 characters long';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleOrderSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const orderData = {
            items: checkoutItems.map(item => ({
                productId: item.id,
                quantity: item.quantity,
            })),
            totalAmount,
            userDetails,
        };

        try {
            const response = await fetch('https://vidoyo-backend-f0g6vrjpg-shahneelas-projects.vercel.app/api/order', {
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
                        <input type='text' name='name' value={userDetails.name} onChange={handleInputChange} />
                        {errors.name && <span className='error'>{errors.name}</span>}
                    </label>
                    <label>
                        Email:
                        <input type='email' name='email' value={userDetails.email} onChange={handleInputChange} />
                        {errors.email && <span className='error'>{errors.email}</span>}
                    </label>
                    <label>
                        Phone Number:
                        <input type='tel' name='phoneNumber' value={userDetails.phoneNumber} onChange={handleInputChange} />
                        {errors.phoneNumber && <span className='error'>{errors.phoneNumber}</span>}
                    </label>
                    <label>
                        Address:
                        <textarea name='address' rows='3' value={userDetails.address} onChange={handleInputChange}></textarea>
                        {errors.address && <span className='error'>{errors.address}</span>}
                    </label>
                    <button type='submit' className='submit-btn'>Confirm Order</button>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
