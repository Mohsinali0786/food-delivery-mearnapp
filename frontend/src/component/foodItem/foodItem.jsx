import "./foodItem.css";
import { Rating } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useContext, useState } from "react";
import { StoreContext } from "../../context/storeContext";
const FoodItem = ({ key, id, name }) => {
  const [itemCount, setItemCount] = useState(0);
  const {cartItems,addToCart,removeFromCart} = useContext(StoreContext)
//   console.log(cartItem,'cartItemmmmmm',id)
//   console.log(!cartItem,'!cartItem[id]')

  return (
    <div className="food-item">
      <di className="food-item-image-container">
        <img src="" alt="" className="food-item-img" />
        {!cartItems[id] ? 
            <AddIcon onClick={()=>addToCart(id)} className="add"/> : 
            <div className="food-item-counter">
                <AddCircleOutlineIcon onClick={()=>addToCart(id)} className="addItemsIcon" sx={{backgroundColor:'green'}}/>
                <p>{cartItems[id]}</p>
                <RemoveCircleOutlineIcon onClick={()=>removeFromCart(id)} sx={{backgroundColor:'red'}} className="addItemsIcon"/>
            </div>
        }
        <div className="food-item-info">
          <div className="food-item-name-rating">
            <p>{name}</p>
            {/* <img src="" alt="" /> */}
            <Rating size="small" name="read-only" value={2} readOnly />
          </div>
          <p className="food-item-description">description</p>
          <p className="food-item-price">Price</p>
        </div>
      </di>
    </div>
  );
};
export default FoodItem;
