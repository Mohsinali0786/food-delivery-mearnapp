import ClearIcon from "@mui/icons-material/Clear";
import { useContext, useEffect, useState } from "react";
import "./category.css";
import { patchRequest, postRequest } from "../../utils/service";
import { StoreContext } from "../../context/storeContext";
import { toast } from "react-toastify";
import axios from "axios";
export default function CategoryForm({ setShowCategoryForm }) {
  // const [currState, setCurrState] = useState("Sign Up");
  const { token, setToken, setCartItems, setLoginData, loginData, url } =
    useContext(StoreContext);
  const [data, setData] = useState({});
  const onAdd = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.post(
      `${url}/add-category`,
      data,
      config
    );
    console.log(res.data);

    console.log(res, "errrrr");
    if (res.data && res.data.success) {
      // toast.success(res.data.message)
    }
    if (res && res.data.message) {
      toast.success(res.data.message)
    }
  };
 

  useEffect(() => {
  }, []);
 
  return (
    <div className="login-popup">
      <form
        action=""
        onSubmit={(e) => onAdd(e)}
        className="login-popup-container"
      >
        <div className="login-popup-title">
          <h2>Add Your Product Category</h2>
          <ClearIcon
            className="cancelIcon"
            onClick={() => setShowCategoryForm(false)}
          />
        </div>
        <div className="login-popup-input">
          <input
            type="text"
            name="Product Category"
            value={data?.category}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            placeholder="Product Category"
            required
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
