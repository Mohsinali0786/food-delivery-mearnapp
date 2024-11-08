import { useContext, useState, useEffect } from "react";
import { Button } from "@mui/material";
import "./order.css";
import axios from "axios";
// import img from "../../assets/food.jpg";
import { Navigate, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/storeContext";
export default function PlaceOrder() {
  const navigate =useNavigate()
  const { getCartTotalAmount, token, allItems, cartItems, url ,loginData } =
    useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    city: "",
    country: "",
    phone: "",
  });
  const onChangeHandler = (e) => {
    console.log("ruuninf", e.target.name);
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    allItems.map((item) => {
      if (cartItems[item?._id] > 0) {
        let itemInfo = item;
        console.log(item, "items Id");
        itemInfo["quantity"] = cartItems[item?._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      userId: JSON.parse(localStorage.getItem("loginInfo"))?._id,
      address: data,
      items: orderItems,
      amount: getCartTotalAmount() + 2,
    };
    let res = await axios.post(url + "/placeOrder", orderData, {
      headers: { token },
    });
    console.log("res.data ====>", res);
    if (res.data.success) {
      const { session_url } = res.data;
      window.location.replace(session_url);
    }
  };
  useEffect(() => {
    if (!token || getCartTotalAmount() === 0) {
      navigate("/cart-items");
    } 
    // else if (getCartTotalAmount() === 0) {
    //   navigate("/cart-items");
    // }
  },[token]);
  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            name="firstName"
            type="text"
            onChange={onChangeHandler}
            value={data?.firstName}
            placeholder="First Name"
          />
          <input
            name="lastName"
            type="text"
            onChange={onChangeHandler}
            value={data?.lastName}
            placeholder="Last Name"
          />
        </div>
        <div className="d-flex">
          <input
            name="email"
            type="text"
            onChange={onChangeHandler}
            value={data?.email}
            placeholder="Email"
          />
        </div>
        <div className="d-flex">
          <input
            name="street"
            type="text"
            onChange={onChangeHandler}
            value={data?.street}
            placeholder="Street"
          />
        </div>
        <div className="multi-fields">
          <input
            name="city"
            type="text"
            onChange={onChangeHandler}
            value={data?.city}
            placeholder="City"
          />
          <input
            name="state"
            type="text"
            onChange={onChangeHandler}
            value={data?.state}
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            name="zipcode"
            type="text"
            onChange={onChangeHandler}
            value={data?.zipcode}
            placeholder="Zip Code"
          />
          <input
            name="country"
            type="text"
            onChange={onChangeHandler}
            value={data?.country}
            placeholder="Country"
          />
        </div>
        <div className="d-flex">
          <input
            name="phone"
            type="text"
            onChange={onChangeHandler}
            value={data?.phone}
            placeholder="Phone"
          />
        </div>
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getCartTotalAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getCartTotalAmount() + 2}</b>
            </div>
          </div>
          <Button className="" type="submit">
            PROCEED TO Payment
          </Button>
        </div>
      </div>
    </form>
  );
}
