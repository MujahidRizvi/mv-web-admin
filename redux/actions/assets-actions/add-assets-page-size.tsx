import { UPDATE_ASSETS_PAGE_SIZE } from "../../action-types/assets-type";

//Adding user information to state + local storage
export function addCollectionPageSize(size:any) {
  return {
    type: UPDATE_ASSETS_PAGE_SIZE,
    payload: size,
  };
}
