import { createContext, useEffect, useState } from "react";
import { getRequest, patchRequest, postRequest } from "../utils/service";
import axios from 'axios'
export const StoreContext = createContext(null)

export const StoreContextProvider = (props) => {
    const [allItems, setAllItems] = useState([])
    const [allCategory, setAllCategory] = useState([])
    const [loginData, setLoginData] = useState({})
    const [cartItems, setCartItems] = useState({})
    const [token, setToken] = useState('')
    useEffect(() => {
        async function loadData() {
            await getAllFoods()
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"))
            }
        }
        loadData()
    }, [])
    console.log('tokeeeeeeeen Outside', token)

    const url = "https://food-delivery-b-mearnapp.vercel.app/api"
//   const url = "http://localhost:5001/api"


    const addToCart = async (itemId,quantity) => {
        if(quantity == cartItems[itemId] && quantity){
            return
        }
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        console.log(token, 'token')
        if (token) {
            postRequest( "/cart", { productId: itemId },token )
            // await axios.post(url + "/cart", { productId: itemId }, { headers: { token } })
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            // await axios.patch(url + "/cart", { productId: itemId }, { headers: { token } })
            await patchRequest("/cart", { productId: itemId }, token)

        }
    }
    // useEffect(() => {
    //     console.log(cartItems, 'Useeffect cartItems')
    // }, [cartItems])
    const loadCartData = async (token) => {
        // console.log('tokeeeeeeeen', token)
        // const res = await axios.get(url + "/cart", { headers: { token } })
        const res = await getRequest("/cart",token )

        console.log(res.data, 'res.data')
        if(res.data) setCartItems(res.data)
    }
    const getCartTotalAmount = () => {
        let totalAmount = 0
        for (const item in cartItems) {
            console.log(item, 'itemmmm')
            if (cartItems[item] > 0) {
                console.log('cartItems[item]', cartItems[item])
                let itemInfo = allItems.find((x, i) => x._id == item)
                console.log('itemInfo', itemInfo)
                totalAmount += itemInfo.price?.mrp * cartItems[item]
            }
        }
        return totalAmount
    }

    const getAllFoods = async (url) => {
        let items = await getRequest("/getAllItems")
        setAllItems(items?.allItems);
        console.log(allItems, 'get All Items from storeContext')

    };
    const contextValue = {
        allItems,
        setAllItems,
        allCategory,
        setAllCategory,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getCartTotalAmount,
        setToken,
        token,
        url,
        setLoginData,
        loginData,
        getAllFoods
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
