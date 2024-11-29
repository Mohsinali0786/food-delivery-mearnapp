import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/storeContext";
import { getRequest, postRequest } from "../../utils/service";
import { Button } from "@mui/material";
import FoodItem from "../foodItem/foodItem";
import "./foodDisplay.css";
import SearchIcon from "@mui/icons-material/Search";
export default function FoodDisplay({ category }) {
  let { allItems, setAllItems } = useContext(StoreContext);
  const [searchParams, setSearchParams] = useState({ name: "category" ,value:'' });

  console.log(category, "category");
  console.log(allItems, "allItems");
  const onSearch = async (val) => {
    let res = await postRequest("/searchBy", searchParams);
    console.log(res, "Search By");
    setAllItems(res.data);
  };
  useEffect(() => {
    console.log("useEffect");
    onSearch()
  }, [searchParams]);
  // useEffect(() => {
  //   console.log("useEffect for allItems");
  // }, [allItems]);
  return (
    <div className="food-display">
      <h2>Top dishes near you</h2>
      <div className="searchBarWrapper">
        <div className="searchBar">
          <SearchIcon className="searchIcon" />
          <input
            placeholder="Search by"
            onChange={(e) => {
              setSearchParams({ ...searchParams, value: e.target.value });
            }}
          />
          <select
            onChange={(e) => {
              setSearchParams({ ...searchParams, name: e.target.value });
            }}
          >
            <option value="category">Category</option>
            <option value="name">Name</option>
          </select>
          {/* <Button className="searchButton" onClick={() => onSearch()}>
            Search
          </Button> */}
        </div>
      </div>
      {allItems && allItems.length > 0 ? (
        <div className="food-display-list">
          {allItems &&
            allItems.map((item, index) => {
              console.log(item, " ============> allItems");
              if (category == "All" || category == item.category || !category) {
                return (
                  <FoodItem
                    quantity={item.quantity}
                    description={item?.description}
                    key={index}
                    id={item?._id}
                    name={item?.name}
                    image={item?.image?.url}
                    price={item?.price}
                    category={item?.category}
                    rating={item?.rating}
                  />
                );
              }
            })}
        </div>
      ) : (
        <h3 style={{textAlign:'center'}}>No Data Found against your Product <i>{searchParams?.name}</i></h3>
      )}
    </div>
  );
}
