import { ADD_ASSETS } from "../../action-types/assets-type";


//Adding user information to state + local storage
export function addAssets(assets:any) {
  return {
    type: ADD_ASSETS,
    payload: assets,
  };
}
