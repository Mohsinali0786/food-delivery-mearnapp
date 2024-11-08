import { getRequest } from "./service";
export const getAllFoods = async (url) => {
    const allFood = await getRequest("/getAllItems");
    return allFood
}
export const getFoodCategory = async () => {
    const data = await getRequest(`/get-category`);
    // setCategory(data?.data?.allCategories);
    return data?.allCategories
  }
