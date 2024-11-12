import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../../context/shop-context';

import './ProductDetail.css'; // Update this file with custom styles
import { PRODUCT_LIST } from '../shop/products'; // Adjust path as needed

const ProductDetail = () => {
    const { id } = useParams();
    const { products, addToCart, cartItems } = useContext(ShopContext);
    const [quantity, setQuantity] = useState(1);

    if (!products) {
        return <p>Loading...</p>; // Display a loading message if products are not loaded yet
    }

    const productId = parseInt(id, 10);
    const product = products.find(item => item.id === productId);

    if (!product) {
        return <p>Product not found</p>; // Handle case where product doesn't exist
    }

    const cartItemAmount = cartItems[productId] || 0;

    // Handle 'Buy Now' functionality
    const handleBuyNow = () => {
        // Navigate to checkout with productId as a query parameter
        window.location.href = `/checkout?productId=${productId}`;
    };
    
    // Adjust quantity handler
    const handleQuantityChange = (amount) => {
        setQuantity(prevQuantity => Math.max(1, prevQuantity + amount));
    };

    return (
        <div className='productDetail'>
            {/* Product Image */}
            <div className='product-image-container'>
                <img src={product.productImage} alt={product.productName} className='product-image' />
            </div>

            {/* Product Info Section */}
            <div className='product-info-container'>
                <h1>{product.productName}</h1>
                
                {/* Price and Discount Section */}
                <div className='price-section'>
                    <p className='original-price'>Rs.11,800.00</p> {/* Static example of original price */}
                    <p className='discounted-price'>Rs.{product.price}</p>
                    <p className='savings'>You save Rs.1,310.00</p> {/* Static example of savings */}
                </div>

                {/* Installment Payment Option */}
                <div className='installment-option'>
                    <p>Pay in 3 installments of <span className='installment-amount'>Rs.4,021</span></p>
                </div>

                {/* Product Description */}
                <p className='product-description'>{product.Description}</p>

                {/* Quantity Selector */}
                <div className='quantity-selector'>
                    <button onClick={() => handleQuantityChange(-1)}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => handleQuantityChange(1)}>+</button>
                </div>

                {/* Add to Cart and Buy Now Buttons */}
                <div className='action-buttons'>
                    <button className='add-to-cart' onClick={() => addToCart(productId, quantity)}>
                        Add To Cart {cartItemAmount > 0 && ({cartItemAmount})}
                    </button>
                    <button className='buy-now' onClick={handleBuyNow}>
                        Buy It Now
                    </button>
                </div>
            </div>

            {/* Reviews Section */}
            <div className='reviews-section'>
                <h2>Customer Reviews</h2>
                <div className='review'>
                    <p><strong>John Doe</strong> - ★★★★☆</p>
                    <p>"Amazing product! Really enjoyed the quality and the results."</p>
                </div>
                <div className='review'>
                    <p><strong>Jane Smith</strong> - ★★★★★</p>
                    <p>"Exceeded my expectations. I would definitely buy this again!"</p>
                </div>
                <div className='review'>
                    <p><strong>Michael Brown</strong> - ★★★☆☆</p>
                    <p>"Good, but a bit pricey for what it offers."</p>
                </div>
            </div>

            {/* Suggested Products Section */}
            

{/* Suggested Products Section */}
<div className='suggested-products'>
    <h2>Suggested Products</h2>
    <div className='suggested-products-list'>
        {PRODUCT_LIST.filter(item => item.id !== productId).map(suggestedProduct => (
            <div key={suggestedProduct.id} className='suggested-product-card'>
                <div className='suggested-product-image-container'>
                    <img
                        src={suggestedProduct.productImage}
                        alt={suggestedProduct.productName}
                        className='suggested-product-image'
                    />
                </div>
                <div className='suggested-product-details'>
                    <p className='suggested-product-name'>{suggestedProduct.productName}</p>
                    <p className='suggested-product-price'>Rs.{suggestedProduct.price}</p>
                    
                    {/* Add to Cart Button */}
                    <button
                        className='suggested-add-to-cart'
                        onClick={() => addToCart(suggestedProduct.id, 1)}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        ))}
    </div>
</div>

        </div>
    );
};

export default ProductDetail;