import { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../context/storeContext";
import paracel_icon from "../../assets/parcel.avif";
import { Button } from "@mui/material";
import { ProductForm } from "../../component";
import "./OurMenu.css";
import axios from "axios";
import { deleteRequest } from "../../utils/service";
import { getAllFoods } from "../../utils/commonMethods";
export default function Menu() {
  const { token, url, loginData, allItems, setAllItems } =
    useContext(StoreContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();
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

  const deleteFood = async (id) => {
    // setLoading(true);
    let res = await deleteRequest(`/deleteFoodById/${id}`);
    console.log(res);
    let allItems = await getAllFoods();
    console.log(allItems, "allllll");
    setAllItems(allItems?.allItems);
    // setLoading(false);
  };
  return (
    <>
      {showProductForm ? (
        <ProductForm setShowProductForm={setShowProductForm} />
      ) : null}
      <div className="cart">
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShowProductForm(true)}>Add Product</Button>
        </div>
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

          {loading
            ? ""
            : allItems?.map((item, index) => {
                return (
                  <div>
                    <div className="cart-items-title cart-items-item">
                      <img src={item?.image?.url} alt="" />
                      <p>{item?.name}</p>
                      <p>${item?.price?.mrp}</p>
                      <p>{item?.quantity}</p>
                      <p
                        onClick={() => deleteFood(item?._id)}
                        className="pointer"
                      >
                        x
                      </p>
                    </div>
                    <hr />
                  </div>
                );
              })}
        </div>
      </div>
    </>
  );
}
