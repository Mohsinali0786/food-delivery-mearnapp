import { useEffect, useState } from "react";
import axios from "axios";
import "./list.css";
import { toast } from "react-toastify";
export default function ListItems({url}) {
  const [list, setList] = useState([]);
  useEffect(() => {
    console.log("uuuuuuuuuuu");
    fetchFoodsList();
  }, []);
  const fetchFoodsList = async () => {
    const res = await axios.get(`${url}/getAllItems`);
    console.log("success", res);
    if (res.data.success) {
      setList(res.data.allItems);
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
  };
  const removeFood = async(foodId) =>{
    const res = await axios.post(`${url}/deleteFoodById`,{id:foodId});
    console.log("success", res);
    if (res.data.success) {
      await fetchFoodsList()
      toast.success(res.data.message);
      return
    }
    toast.error(res.data.message);
  }
  return (
    <div className="list add flex-col">
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
      </div>
      {list &&
        list.map((item, index) => {
          return (
            <div className="list-table-format">
              {/* <img src={`http://localhost:5001/images/${item?.image}`} alt="" /> */}
              <img src={`https://food-delivery-b-mearnapp.vercel.app/api/images/${item?.image}`} alt="" />

             

              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price?.mrp}</p>
              {/* <p>{item.description}</p> */}
              <p className="cursor" onClick={()=>removeFood(item?._id)}>X</p>
            </div>
          );
        })}
    </div>
  );
}
