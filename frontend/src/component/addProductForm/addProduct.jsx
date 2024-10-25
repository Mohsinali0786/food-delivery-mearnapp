import ClearIcon from "@mui/icons-material/Clear";
import { useContext, useEffect, useState } from "react";
import "./addProduct.css";
import { patchRequest, postRequest } from "../../utils/service";
import { StoreContext } from "../../context/storeContext";
import axios from "axios";
export default function ProductForm({ setShowProductForm }) {
  const [currState, setCurrState] = useState("Sign Up");
  const { token, setToken, setCartItems, setLoginData, loginData, url } =
    useContext(StoreContext);
  const [data, setData] = useState({});

  const [category, setCategory] = useState([]);
  const [file, setFile] = useState();

  const onAdd = async (e) => {
    e.preventDefault();
    let res = {};
    console.log(data);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("productName",data?.productName)
    formData.append("description",data?.description)
    formData.append("quantity",data?.quantity)
    formData.append("category",data?.category)
    // formData.append("price",data?.price)
    // JSON.stringify(formData)
    // setData({...data,...formData})
    // res = await postRequest("/addFood", formData, token);
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
        }
    };
    const result = await axios.post('http://localhost:5001/api/addFood', formData,config)
    console.log(result.data)
  
    console.log(res, "errrrr");
    if (res && res.success) {
    }
    if (res && res.message) {
      alert(res.message);
    }
  };
  useEffect(() => {
    getFoodCategory();
  }, []);
  async function getFoodCategory() {
    const data = await axios.get(`${url}/api/get-category`);
    setCategory(data?.data?.allCategories);
    console.log(data?.data?.allCategories);
    // return data?.data?.allCategories
  }
  console.log(loginData, "loginData in Sign in");
  return (
    <div className="login-popup">
      <form
        action=""
        onSubmit={(e) => onAdd(e)}
        className="login-popup-container"
      >
        <div className="login-popup-title">
          <h2>Add Your Product</h2>
          <ClearIcon
            className="cancelIcon"
            onClick={() => setShowProductForm(false)}
          />
        </div>
        <div className="login-popup-input">
          <input
            type="file"
            filename={file}
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
            required
          />
          <input
            type="text"
            name="Product name"
            value={data?.productName}
            onChange={(e) => setData({ ...data, productName: e.target.value })}
            placeholder="Product Name"
            required
          />
          <input
            type="text"
            name="Description"
            value={data?.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            placeholder="Description"
            required
          />
          <input
            type="number"
            name="Quantity"
            value={data?.quantity}
            onChange={(e) => setData({ ...data, quantity: e.target.value })}
            placeholder="Quantity"
            required
          />
          <input
            type="number"
            name="Price"
            value={data?.price}
            // onChange={(e) => setData({ ...data, price: e.target.value })}
            placeholder="Price"
            required
          />
          <select
            name="Category"
            value={data?.category}
            id=""
            onChange={(e) => setData({ ...data, category: e.target.value })}
          >
            <option value="" disabled selected hidden>
              Select your Category
            </option>
            {category?.map((item, index) => {
              return <option>{item?.name}</option>;
            })}
          </select>
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
