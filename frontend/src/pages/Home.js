import { Header ,ExploreMenu, FoodDisplay, AppDownload} from "../component"
import { useState } from "react"
import { useContext } from "react"
import { StoreContext } from "../context/storeContext"
import { getRequest } from "../utils/service"
import { useEffect } from "react"
export default function Home() {
    let  {allItems,setAllItems,allCategory,setAllCategory ,loginData} = useContext(StoreContext)
    const [category,setCategory] = useState('All')
    
    console.log('allCategory ===>',allCategory)
    useEffect(()=>{
      console.log('loginData in Home',loginData)
        // getAllFoods()
        getAllCategory()
    },[loginData])
    // const getAllFoods = async (url) => {
    //     let items = await getRequest("/getAllItems")
    //     setAllItems(items?.allItems);
    //   console.log(allItems,'FooooooodListtttttt')

    //   };
      const getAllCategory = async (url) => {
        let items = await getRequest("/get-category")
        setAllCategory(items?.allCategories);
      console.log(allItems,'FooooooodListtttttt')

      };
    return (
        <>
            <Header/>
            <ExploreMenu category={category} setCategory={setCategory} />
            <FoodDisplay category={category} />
            <AppDownload/>
        </>
    )
}