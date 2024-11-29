import { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../context/storeContext";
import paracel_icon from "../../assets/parcel.avif";
import { Button } from "@mui/material";
import noData from "../../assets/noData.png";
import "./userFavourite.css";
import axios from "axios";
import { FoodItem, Spinner } from "../../component";
import { getRequest } from "../../utils/service";
export default function MyFaourites() {
  const { loginData, url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    if (loginInfo?._id) {
      getFavourites();
    }
  }, []);
  const getFavourites = async () => {
    setLoader(true);
    let favouriteData = await getRequest(
      "/favorite",
      localStorage.getItem("token")
    );
    // console.log(favouriteData.data,'favouriteData')
    if (favouriteData) setData(favouriteData);
    setLoader(false);
  };
  console.log("data", data);
  return (
    <div className="my-orders">
      {loader ? (
        <Spinner />
      ) : data && data.length > 0 ? (
        <div className="food-display-list">
          {data &&
            data.map((item, index) => {
              console.log(item, " ============> data");
              //   if (category == "All" || category == item.category || !category) {
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
                />
              );
              //   }
            })}
        </div>
      ) : (
        <h3 style={{ textAlign: "center" }}>No Favourite Found against</h3>
      )}
    </div>
  );
}
