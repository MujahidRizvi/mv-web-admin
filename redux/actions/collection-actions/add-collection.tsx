import { ADD_COLLECTION } from "../../action-types/collection-type";


//Adding user information to state + local storage
export function addCollection(categories:any) {
  return {
    type: ADD_COLLECTION,
    payload: categories,
  };
}
