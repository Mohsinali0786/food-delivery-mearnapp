import { getRequest } from "./service";
export const getAllFoods = async (url) => {
    const allFood = await getRequest("/getAllItems");
    return allFood
}