import { UPDATE_COLLECTION_PAGE_SIZE } from "../../action-types/collection-type";

//Adding user information to state + local storage
export function addCollectionPageSize(size:any) {
  return {
    type: UPDATE_COLLECTION_PAGE_SIZE,
    payload: size,
  };
}
