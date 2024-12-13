import "./foodItem.css";
import { Rating } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  FavoriteBorder,
  Favorite,
  RemoveCircleOutline,
  AddCircleOutlineIcon,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../context/storeContext";
import { getRequest, patchRequest, postRequest } from "../../utils/service";
const FoodItem = ({
  key,
  id,
  name,
  image,
  price,
  description,
  quantity,
  category,
  rating,
}) => {
  const [itemCount, setItemCount] = useState(0);
  const [favourite, setFavourite] = useState(false);
  const [favouriteList, setFavouriteList] = useState([]);

  const { cartItems, addToCart, removeFromCart, url, allItems } =
    useContext(StoreContext);
  useEffect(() => {
    console.log("useEffect favvvvvv", favourite);
    const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    if(loginInfo && loginInfo?._id){
      // if (JSON.parse(loginInfo)?._id) {
        getUserFavourite();
      // }
    }
    else{

      setFavouriteList([]);
    }
  }, [favourite,allItems ,localStorage.getItem("loginInfo")]);
  // useEffect(() => {
  //   if (!localStorage.getItem("loginInfo")) {
  //   }
  // }, [localStorage.getItem("loginInfo")]);
  const addToFavourite = async (itemId) => {
    let res = await postRequest(
      "/favorite",
      { productId: itemId },
      localStorage.getItem("token")
    );
    if (res && res.success) {
      // getUserFavourite()
      toast.success(res.message);
      getUserFavourite();
      // setFavourite(true);
    }
    else{
      toast.error(res.message);
    }
  };
  const getUserFavourite = async () => {
    let res = await getRequest("/favorite", localStorage.getItem("token"));
    console.log(res, "favvvvvv");
    if (res && !res.success) {
      setFavourite(true);
      // return toast.error(res.message);
      let ids = [];
      for (let i = 0; i < res.length; i++) {
        ids.push(res[i]._id);
      }
      setFavouriteList(ids);
    }
  };
  const removeFromavourite = async (itemId) => {
    let res = await patchRequest(
      "/favorite",
      { productId: itemId },
      localStorage.getItem("token")
    );
    if (res.success) {
      toast.success(res.message);
      setFavourite(false);
      // getUserFavourite();
      // getUserFavourite();
    }
  };
  console.log("favvvvv Outside favorite", favouriteList);

  return (
    <div className="food-item">
      <div className="food-item-image-container">
        {/* <img src={`${url}/images/${image}`} alt="" className="food-item-img" /> */}
        <img src={image} alt="" className="food-item-img" />
        {quantity > 0 ? (
          cartItems && !cartItems[id] ? (
            <AddIcon onClick={() => addToCart(id)} className="add" />
          ) : (
            cartItems &&
            <div className="food-item-counter">
              <RemoveCircleOutline
                onClick={() => addToCart(id, quantity)}
                className="addItemsIcon"
                sx={{ backgroundColor: "green" }}
              />
              <p>{cartItems[id]}</p>
              <RemoveCircleOutline
                onClick={() => removeFromCart(id)}
                sx={{ backgroundColor: "red" }}
                className="addItemsIcon"
              />
            </div>
          )
        ) : null}
        <div className="food-item-info">
          {quantity < 1 ? <p className="outOfStock">Out of Stock</p> : null}
          <div className="food-item-name-rating">
            <p>{name.slice(0, 1).toUpperCase() + name.slice(1)}</p>
            {/* <img src="" alt="" /> */}
            <div className="ratingDiv">
              <Rating
                size="small"
                name="read-only"
                value={rating / 20}
                precision={0.5}
                readOnly
              />
              <p>Rating ({rating?.toFixed(2)})</p>
            </div>
          </div>
          <div>
            <div className="categoryChipWrapper">
              <div>
                <p className="categoryChipTitle">
                  Category{" "}
                  <span className="categoryChipText">
                    {category?.slice(0, 1).toUpperCase() + category?.slice(1)}
                  </span>
                </p>
              </div>
              {!favouriteList?.includes(id) ? (
                <FavoriteBorder
                  sx={{ color: "inherit", fontSize: "28px", color: "red" }}
                  onClick={() => {
                    addToFavourite(id);
                  }}
                />
              ) : (
                <Favorite
                  sx={{ color: "inherit", fontSize: "28px", color: "red" }}
                  onClick={() => {
                    removeFromavourite(id);
                  }}
                />
              )}
            </div>
          </div>
          <p className="food-item-description">{description}</p>
          <div className="d-flex justify-content-between">
            <div>
              {price?.org ? (
                <p
                  className={
                    price?.mrp < 1 || price?.mrp == price?.org
                      ? "food-item-price item-price-margin"
                      : "line-through"
                  }
                >
                  Price Rs {price?.org}
                </p>
              ) : null}
              {price?.mrp && price?.mrp != price?.org ? (
                <p className="">
                  Now Availbale at
                  <p className="food-item-price mp-0">Rs {price?.mrp}</p>
                </p>
              ) : null}
            </div>
            {price?.off > 0 ? (
              <p className="d-flex flex-column align-center">
                <span className="fs-11">Discount</span>
                <span className="discount">{price?.off}%</span>
              </p>
            ) : null}
          </div>
          <p className="mp-0">
            Quantity:<b>{quantity}</b>
          </p>
        </div>
      </div>
    </div>
  );
};
export default FoodItem;
