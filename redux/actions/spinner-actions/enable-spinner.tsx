import { ENABLE_SPINNER } from "../../action-types/spinner-type";

//Adding user information to state + local storage
export function enableSpinner() {
  return {
    type: ENABLE_SPINNER,
  };
}
