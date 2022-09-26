import {  UPDATE_COLLECTION_PAGE } from "../../action-types/collection-type";


//Adding user information to state + local storage
export function addCollectionPage(page:any) {
  return {
    type: UPDATE_COLLECTION_PAGE,
    payload: page,
  };
}
