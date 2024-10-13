import axios from 'axios'
async function  getFoodCategory (){
    const data = await axios.get("https://food-delivery-b-mearnapp.vercel.app/get-category")
    console.log(data?.data?.allCategories)
    return data?.data?.allCategories
}
export{
    getFoodCategory
}