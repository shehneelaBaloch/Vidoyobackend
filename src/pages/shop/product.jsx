import React from 'react'
import { ShopContext } from '../../context/shop-context'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import './ProductDetail.css'

const Product = (props) => {
    const { id, productName, price, productImage } = props.data
    const { addToCart, cartItems } = useContext(ShopContext)
    const cartItemAmount = cartItems[id]
    const navigate = useNavigate()

    const handleViewProduct = () => {
        navigate(`/product/${id}`)
    }

    return (
        <div className='product'>
            <div className='productInfo'>
                <div className="product-image-container">
                    <img src={productImage} alt={productName} className="product-image"/>
                </div>
                <h2 className="product-name">{productName}</h2>
                <h3 className="product-price">From Rs {price}</h3>
                <div className="product-buttons">
                    <button className='addBttn' onClick={() => addToCart(id)}>
                        Add To Cart {cartItemAmount > 0 && `(${cartItemAmount})`}
                    </button>
                    <button className='viewBttn' onClick={handleViewProduct}>
                        View Product
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Product
