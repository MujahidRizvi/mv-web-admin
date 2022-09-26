import { DISABLE_SPINNER } from "../../action-types/spinner-type";

//Adding user information to state + local storage
export function disableSpinner() {
  return {
    type: DISABLE_SPINNER,

  };
}
