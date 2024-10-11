import { useContext } from "react";
import { StoreContext } from "../../context/storeContext";
import { Button } from "@mui/material";
import "./cart.css";
import img from "../../assets/food.jpg";
import { Navigate, useNavigate } from "react-router-dom";
export default function Cart() {
  const { cartItems, allItems, removeFromCart , getCartTotalAmount , url} = useContext(StoreContext);
//   console.log("Cart Item", cartItems);
const navigate = useNavigate()
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {Object.keys(cartItems).length == 0 ? (
          <p className="text-center p-2">No Items in Cart</p>
        ) : (
          allItems?.map((item, index) => {
            console.log(item);
            if (cartItems[item?._id] > 0) {
              return (
                <div>
                  <div className="cart-items-title cart-items-item">
                    <img src={`${url}/images/${item?.image}`} alt="" />
                    <p>{item?.name}</p>
                    <p>${item?.price?.mrp}</p>
                    <p>{cartItems[item?._id]}</p>
                    <p>${item?.price?.mrp * cartItems[item?._id]}</p>
                    <p
                      onClick={() => removeFromCart(item?._id)}
                      className="pointer"
                    >
                      x
                    </p>
                  </div>
                </div>
              );
            }
          })
        )}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{getCartTotalAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{getCartTotalAmount() == 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>{getCartTotalAmount() == 0 ? 0 : getCartTotalAmount()+2}</b>
            </div>
          </div>
          <Button className="" onClick={()=>navigate('/orders')}>
            PROCEED TO CHECKOUT
          </Button>
        </div>
      <div className="cart-promocode">
        <div>
          <p>If you have promo code, Enter it here</p>
          <div className="cart-promocode-input">
            <input type="text" placeholder="Promo Code" />
            <Button className="">
              Submit
            </Button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
