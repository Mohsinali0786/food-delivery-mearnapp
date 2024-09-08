import { useContext } from "react";
import { Button } from "@mui/material";
import "./order.css";
// import img from "../../assets/food.jpg";
import { Navigate, useNavigate } from "react-router-dom";
import { StoreContext } from "../../../context/storeContext";
export default function PlaceOrder() {
  const { getCartTotalAmount } = useContext(StoreContext);

  return (
    <form className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
        </div>
        <div className="d-flex">
          <input type="text" placeholder="Email" />
        </div>
        <div className="d-flex">
          <input type="text" placeholder="Street" />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder="City" />
          <input type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder="Zip Code" />
          <input type="text" placeholder="Country" />
        </div>
        <div className="d-flex">
          <input type="text" placeholder="Phone" />
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
          <Button className="" onClick={() => Navigate("/order")}>
            PROCEED TO Payment
          </Button>
        </div>
      </div>
    </form>
  );
}
