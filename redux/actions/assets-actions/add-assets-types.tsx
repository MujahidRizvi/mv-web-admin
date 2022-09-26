import { GET_ASSET_TYPES } from "../../action-types/assets-type";


//Adding user information to state + local storage
export function getAssetTypes(types:any) {
  return {
    type: GET_ASSET_TYPES,
    payload: types,
  };
}
