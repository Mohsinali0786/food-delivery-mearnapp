import { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../context/storeContext";
import paracel_icon from "../../assets/parcel.avif";
import { Button } from "@mui/material";
// import noData from "../../lottie animation/noData.json"
// import Lottie from 'react-lottie'
import noData from "../../assets/noData.png"
import "./myOrder.css";
import axios from "axios";
export default function MyOrders() {
  const { token, url, loginData } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const fetchOrders = async () => {
    const loginData = JSON.parse(localStorage.getItem("loginInfo"));
    console.log("loginData", loginData);
    const response = await axios.post(
      url + "/userOrders",
      { userId: loginData._id },
      { headers: { token } }
    );
    setData(response.data.data);
    console.log(response.data.data, "data...........");
  };
  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);
  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      {data.length > 0 ? (
        <div className="container">
          {data.map((order, index) => {
            return (
              <div key={index} className="my-orders-order">
                <img src={paracel_icon} />
                <p>
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " x " + item.quantity;
                    } else {
                      return item.name + " x " + item.quantity + " , ";
                    }
                  })}
                </p>
                <p>${order.amount}</p>
                <p>Items {order.items.length}</p>
                <p>
                  <span>&#x25cf;</span> <b>{order.status}</b>
                </p>
                <Button
                  onClick={() => {
                    fetchOrders();
                  }}
                >
                  Track Order
                </Button>
              </div>
            );
          })}
        </div>
      ) : (
        // <h2>No Data Found</h2>
      <div className="noDataImage">
        <img src={noData}/>
        </div>
      )}
    </div>
  );
}
