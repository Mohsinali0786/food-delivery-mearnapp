import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "./order.css";
import paracel_icon from "../../assets/parcel.avif";
export default function Order({ url }) {
  const orderStatusEnum = [
    {
      name: "Food Processing",
      value: "Food Processing",
    },
    {
      name: "Out For Delivery",
      value: "Out For Delivery",
    },
    {
      name: "Delivered",
      value: "Delivered",
    },
  ];
  useEffect(() => {
    console.log("uuuuuuuuuuu");
    fetchOrderList();
  }, []);
  const fetchOrderList = async () => {
    const res = await axios.get(`${url}/listOrder`);
    console.log("success", res);
    if (res.data.success) {
      setOrder(res.data.data);
      //   toast.success(res.data.message);
    } else {
      //   toast.error(res.data.message);
    }
  };
  const statusHandler = async (e, orderId) => {
    const res = await axios.post(`${url}/updateStatus`,{
        orderId,
        status:e.target.value
    });
    if (res.data.success) {
        await fetchOrderList()
    }
  };
  const [orders, setOrder] = useState([]);
  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders?.map((order, index) => (
          <div key={index} className="order-item">
            <img src={paracel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + " , ";
                  }
                })}
              </p>
              <p className="order-item-name">
                {order?.address?.firstName + " " + order?.address?.lastName}
              </p>
              <div className="order-item-address">
                <p>{order?.address?.street}</p>
                <p>
                  {order?.address?.city +
                    ", " +
                    order?.address?.state +
                    ", " +
                    order?.address?.country +
                    ", " +
                    order?.address?.zipcode}
                </p>
              </div>
              <p className="order-item-phone">{order?.address?.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>$ {order.amount}</p>
            <select
              onChange={(e) => statusHandler(e, order?._id)}
              value={order.status}
            >
              {orderStatusEnum.map((option, index) => (
                <option value={option.value}>{option.name}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
