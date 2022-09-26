import { ADD_CATEGORIES } from "../../action-types/categories-type";

//Adding user information to state + local storage
export function addCategories(categories:any) {
  return {
    type: ADD_CATEGORIES,
    payload: categories,
  };
}
