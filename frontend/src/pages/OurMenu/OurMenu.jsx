import { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../context/storeContext";
import paracel_icon from "../../assets/parcel.avif";
import { Button } from "@mui/material";
import { ProductForm } from "../../component";
import "./OurMenu.css";
import axios from "axios";
export default function Menu() {
  const { token, url, loginData, allItems } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);

  //   const fetchOrders = async () => {
  //     console.log("loginData", loginData);
  //     const response = await axios.post(
  //       url + "/api/userOrders",
  //       { userId: loginData._id },
  //       { headers: { token } }
  //     );
  //     setData(response.data.data);
  //     console.log(response.data.data, "data...........");
  //   };
  useEffect(() => {
    console.log("allItems", allItems);
  }, []);
  return (
    <>
      {showProductForm ? <ProductForm setShowProductForm={setShowProductForm}/> : null}
      <div className="cart">
        <Button onClick={() => setShowProductForm(true)}>Add Product</Button>
        <div className="cart-items">
          <div className="cart-items-title">
            <p>Image</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Remove</p>
          </div>
          <br />
          <hr />
          {allItems?.map((item, index) => {
            return (
              <div>
                <div className="cart-items-title cart-items-item">
                  <img src={`${url}/images/${item?.image}`} alt="" />
                  <p>{item?.name}</p>
                  <p>${item?.price?.mrp}</p>
                  <p>{item?.quantity}</p>
                  <p
                    //   onClick={() => removeFromCart(item?._id)}
                    className="pointer"
                  >
                    x
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
