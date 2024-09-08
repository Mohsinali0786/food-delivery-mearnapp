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

    const getCartTotalAmount = ()=>{
        let totalAmount = 0
        for (const item in cartItems){
            console.log(item,'itemmmm')
            if(cartItems[item] > 0){
                console.log('cartItems[item]',cartItems[item])
                let itemInfo = allItems.find((x,i)=>x._id == item)
                console.log('itemInfo',itemInfo)
                totalAmount+=itemInfo.price?.mrp*cartItems[item]
            }
        }
        return totalAmount
    }
    const contextValue = {
        allItems,
        setAllItems,
        allCategory,
        setAllCategory,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getCartTotalAmount
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
