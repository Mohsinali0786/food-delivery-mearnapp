import { useContext, useEffect } from "react";
import { StoreContext } from "../../context/storeContext";
import { getRequest } from "../../utils/service";
import FoodItem from "../foodItem/foodItem";
import "./foodDisplay.css";
export default function FoodDisplay({ category }) {
  let { allItems, setAllItems } = useContext(StoreContext);

  console.log(category, "category");
  return (
    <div className="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {allItems && allItems.map((item, index) => {
          console.log(allItems , ' ============> allItems')
          if (category == "All" || category == item.category) {
            return <FoodItem key={index} id={item?._id} name={item?.name} image={item?.image} price={item?.price}/>;
          }
        })}
      </div>
    </div>
  );
}
