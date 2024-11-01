import "./foodItem.css";
import { Rating } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useContext, useState } from "react";
import { StoreContext } from "../../context/storeContext";
const FoodItem = ({ key, id, name, image, price ,  description ,quantity }) => {
  const [itemCount, setItemCount] = useState(0);
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);
    console.log(image,'image',id)
    console.log(!cartItems,'!cartItem[id]')

  return (
    <div className="food-item">
      <div className="food-item-image-container">
        {/* <img src={`${url}/images/${image}`} alt="" className="food-item-img" /> */}
        <img src={image} alt="" className="food-item-img" />
        {cartItems && !cartItems[id] ? (
          <AddIcon onClick={() => addToCart(id)} className="add" />
        ) : (
          <div className="food-item-counter">
            <AddCircleOutlineIcon
              onClick={() => addToCart(id , quantity)}
              className="addItemsIcon"
              sx={{ backgroundColor: "green" }}
            />
            <p>{cartItems[id]}</p>
            <RemoveCircleOutlineIcon
              onClick={() => removeFromCart(id)}
              sx={{ backgroundColor: "red" }}
              className="addItemsIcon"
            />
          </div>
        )}
        <div className="food-item-info">
          <div className="food-item-name-rating">
            <p>{name}</p>
            {/* <img src="" alt="" /> */}
            <Rating size="small" name="read-only" value={4} readOnly />
          </div>
          <p className="food-item-description">{description}</p>
          <div className="d-flex justify-content-between">
            <div>
              {price?.org ? (
                <p className={price?.mrp < 1 || price?.mrp == price?.org ? 'food-item-price item-price-margin' : 'line-through'}>Price Rs {price?.org}</p>
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
          <p className="mp-0">Quantity:<b>{quantity}</b></p>

        </div>
      </div>
    </div>
  );
};
export default FoodItem;
