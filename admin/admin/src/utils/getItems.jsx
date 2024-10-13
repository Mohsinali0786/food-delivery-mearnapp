import axios from 'axios'
async function  getFoodCategory (){
    const data = await axios.get("http://localhost:5001/api/get-category")
    console.log(data?.data?.allCategories)
    return data?.data?.allCategories
}
export{
    getFoodCategory
}