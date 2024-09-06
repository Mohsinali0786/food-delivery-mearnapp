import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null)

export const StoreContextProvider = (props) => {
    const [allItems, setAllItems] = useState([])
    const [allCategory, setAllCategory] = useState([])

    const [cartItems, setCartItems] = useState({})

    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    }
    useEffect(() => {
        console.log(cartItems, 'Useeffect cartItems')
    }, [cartItems])
    const contextValue = {
        allItems,
        setAllItems,
        allCategory,
        setAllCategory,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart

    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
