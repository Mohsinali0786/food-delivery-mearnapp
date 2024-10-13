import "./add.css";
// import FileUploadIcon from "@mui/icons-material/FileUpload";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { getFoodCategory } from "../../utils/getItems";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import uploadImage from "../../assets/uplaodImage.png";
import { toast } from "react-toastify";
import axios from "axios";
export default function AddItems({url}) {
  const [categoryData, setCategoryData] = useState([]);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const [image, setImage] = useState(false);

  useEffect(() => {
    const getData = async () => {
      let data = await getFoodCategory();
      setCategoryData(data);
    };
    getData();
  }, []);
  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("dataaaaaaa", data);
    const price = {
      org: data?.price,
      mrp: data?.price - ((data?.price * data?.discount) /100) ,
      off: data?.discount,
    };
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", JSON.stringify(price));
    formData.append("category", data.category);
    formData.append("image", image);
    console.log("form data", formData);
    const res = await axios.post(`${url}/addFood`, formData);
    console.log("success", res);
    if (res.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "",
        discount: "",
      });
      setImage(false);
      toast.success(res.data.message)
    }
    else{
      toast.error(res.data.message)
    }
  };
  return (
    <div className="add">
      <form onSubmit={onSubmitHandler} action="" className="flex-col">
        <div className="add-image-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <div className="icon-div">
              {image ? (
                <img src={image ? URL.createObjectURL(image) : null} alt="" />
              ) : (
                <>
                  <CloudUploadIcon />
                  Upload
                </>
              )}
            </div>
          </label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            type="text"
            value={data?.name}
            onChange={onChangeHandler}
            name="name"
            placeholder="Type here"
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data?.description}
            name="description"
            rows={6}
            placeholder="Write Content Here"
            required
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={onChangeHandler} name="category" id="">
              {categoryData.map((item, index) => {
                return (
                  <option key={index} value={item.name}>
                    {item?.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data?.price}
              type="Number"
              name="price"
              placeholder="$20"
            />
          </div>
          <div className="add-price flex-col">
            <p>Product Discount</p>
            <input
              onChange={onChangeHandler}
              value={data?.discount}
              type="Number"
              name="discount"
              placeholder="%"
            />
          </div>
        </div>
        <Button type="submit" className="add-btn">
          Add
        </Button>
      </form>
    </div>
  );
}
