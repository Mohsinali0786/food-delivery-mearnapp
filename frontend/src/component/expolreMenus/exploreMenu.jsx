import { useContext, useEffect, useState } from "react";
import { getAllFoods, getFoodCategory } from "../../utils/commonMethods";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CancelIcon from '@mui/icons-material/Cancel';
import { getRequest ,deleteRequest } from "../../utils/service";
import './exploreMenu.css'
import sampleImg from "../../assets/food.jpg"
import { StoreContext } from "../../context/storeContext";
export default function ExploreMenu({category,setCategory}) {
  const [menuList, setMenuList] = useState([]);
  const {allCategory,setAllCategory} = useContext(StoreContext)
  useEffect(() => {
    getAllFoods();
  }, []);
  const getAllFoods = async (url) => {
    const allFood = await getRequest("/getAllItems");
    setMenuList(allFood);
  };
  const deleteCategory = async (id) => {
    // setLoading(true);
     await deleteRequest(`/remove-category/${id}`);
    let res = await getFoodCategory()
    console.log('getFoodCategory()',res)
     setAllCategory(res)
   
  };
  return (
    <div className="exploreMenu" id="exploreMenu">
      <h1>Explore Our Menu</h1>
      <p className="explore-menu-text">
        Choose what ever you want to order we are here to provide at you door
        within few minutes
      </p>
      <div className="explore-menu-list">
        {allCategory?.map((item, index) => {
          return (
            <div onClick={()=>setCategory((prev)=>prev==item?.name ? 'All':item?.name)} key={index} className="explore-menu-item-list">
             <CancelIcon className={category == item?.name ? "removeIconForActive" : 'removeIcon'} onClick={()=>{deleteCategory(item?._id)}}/>
             <img className={category == item?.name ? "active" : ""} src={sampleImg}/>
              <p>{item.name}</p>
            </div>
          );
        })}
      </div>
      <hr/>
    </div>
  );
}
