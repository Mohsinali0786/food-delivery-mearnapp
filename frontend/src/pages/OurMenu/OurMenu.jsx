import { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../context/storeContext";
import paracel_icon from "../../assets/parcel.avif";
import AddIcon from "@mui/icons-material/Add";
import { ProductForm, CategoryForm } from "../../component";
import "./OurMenu.css";
import { Button } from "@mui/material";
import axios from "axios";
import { deleteRequest, postRequest } from "../../utils/service";
import { getAllFoods } from "../../utils/commonMethods";
import { BasicModal , UpdatePriceModal } from "../../component";
import { toast } from "react-toastify";
export default function Menu() {
  const { token, url, loginData, allItems, setAllItems } =
    useContext(StoreContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();
  const [showProductForm, setShowProductForm] = useState(false);
  const [updateQuantity, setUpdateQuantity] = useState(false);
  const [quantity,setQuantity] = useState(0)
  const [showCategoryForm, setShowCategoryForm] = useState(false);

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
  const update = async(id) =>{
    console.log('id',id)
    const res = await postRequest(`/updateQuantity/${id}`,{quantity:quantity})
    console.log('resssssssss',res)
    toast.success(res.message)
  }
  return (
    <>
      {showProductForm ? (
        <ProductForm setShowProductForm={setShowProductForm} />
      ) : null}
      {showCategoryForm ? (
        <CategoryForm setShowCategoryForm={setShowCategoryForm} />
      ) : null}
      <div className="cart">
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShowProductForm(true)}>Add Product</Button>
          <Button onClick={() => setShowCategoryForm(true)}>
            Add Category
          </Button>
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
                      <div>
                      <p >${item?.price?.mrp}</p>
                      <UpdatePriceModal title='Set' header='Set Price' onOk={update} setQuantity={setQuantity} foodId={item?._id}/>
                      </div>
                      <div className="d-flex">
                        <p>{item?.quantity}</p>
                        <BasicModal title='Add' header='Add Quantity' onOk={update} setQuantity={setQuantity} foodId={item?._id}/>
                      </div>
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
