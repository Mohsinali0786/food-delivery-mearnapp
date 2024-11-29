import ClearIcon from "@mui/icons-material/Clear";
import { useContext, useEffect, useState } from "react";
import "./addProduct.css";
import { patchRequest, postRequest } from "../../utils/service";
import { StoreContext } from "../../context/storeContext";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../spinner/spinner";
export default function ProductForm({ setShowProductForm }) {
  const [currState, setCurrState] = useState("Sign Up");
  const { token, setToken, setCartItems, setLoginData, loginData, url } =
    useContext(StoreContext);
  const [data, setData] = useState({});

  const [category, setCategory] = useState([]);
  const [addProduct, setAddProduct] = useState(false);
  const [file, setFile] = useState();

  const onAdd = async (e) => {
    e.preventDefault();
    setAddProduct(true);
    let res = {};
    console.log(data);
    // formData.append("productName",data?.productName)
    // formData.append("description",data?.description)
    // formData.append("quantity",data?.quantity)
    // formData.append("category",data?.category)
    // formData.append("price",data?.price)
    // JSON.stringify(formData)
    // setData({...data,...formData})
    // res = await postRequest("/addFood", formData, token);
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    };
    const result = await axios.post(
      "http://localhost:5001/api/addFood",
      data,
      config
    );
    console.log(result.data);

    console.log(res, "errrrr");
    if (result.data && result.data.success) {
      setShowProductForm(false);
      if (result.data.message) toast.success(result.data.message);
    }
    setAddProduct(FontFaceSetLoadEvent);
  };
  const transformFile = async (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        // setFile(reader.result);
        setData({ ...data, image: reader.result });
      };
    }
  };

  useEffect(() => {
    getFoodCategory();
  }, []);
  async function getFoodCategory() {
    const data = await axios.get(`${url}/get-category`);
    setCategory(data?.data?.allCategories);
    console.log(data?.data?.allCategories);
    // return data?.data?.allCategories
  }
  console.log(loginData, "loginData in Sign in");
  return (
    <div className="addProductForm-popup">
      <form
        action=""
        onSubmit={(e) => onAdd(e)}
        className="addProductForm-popup-container"
      >
        <div className="addProductForm-popup-title">
          <h2>Add Your Product</h2>
          <ClearIcon
            className="addProductFormCancelIcon"
            onClick={() => setShowProductForm(false)}
          />
        </div>
        <div className="addProductForm-popup-input">
          <input
            type="file"
            filename={file}
            onChange={(e) => {
              transformFile(e.target.files[0]);
            }}
            required
          />
          <input
            type="text"
            name="Product name"
            value={data?.productName}
            onChange={(e) => setData({ ...data, productName: (e.target.value).toLowerCase() })}
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
            value={data?.price?.org}
            onChange={(e) =>
              setData({
                ...data,
                price: {
                  off: data?.price?.off,
                  org: e.target.value,
                  mrp: e.target.value,
                },
              })
            }
            placeholder="Price"
            required
          />
          <input
            type="number"
            name="Discount"
            value={data?.price?.off}
            onChange={(e) =>
              setData({
                ...data,
                price: {
                  off: e.target.value,
                  org: data?.price?.org,
                  mrp:
                    data?.price?.org -
                    (data?.price?.org * e.target.value) / 100,
                },
              })
            }
            placeholder="Discount %"
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
        <button className="addProductBtn" type="submit">
          <p>Add</p>
          {addProduct ? <Spinner/> : null}
        </button>
      </form>
    </div>
  );
}
