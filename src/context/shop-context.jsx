import React, { useState, createContext } from 'react'
import { PRODUCT_LIST } from '../pages/shop/products' // Import the product list

export const ShopContext = createContext(null)

const getDefaultCart = () => {
    let cart = {}
    for (let i = 1; i < PRODUCT_LIST.length + 1; i++) {
        cart[i] = 0
    }
    return cart
}

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart())
    const [products] = useState(PRODUCT_LIST) // Add products as a state

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: Math.max(prev[itemId] - 1, 0) })) // Prevents negative quantities
    }

    const contextValue = {
        products,       // Add products to the context value
        cartItems,
        addToCart,
        removeFromCart,
    }

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider
