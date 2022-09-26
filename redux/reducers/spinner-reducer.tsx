import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";
import { ENABLE_SPINNER, DISABLE_SPINNER } from "../action-types/spinner-type";

const initialState = { loader: false };

function spinnerReducer(state: any = initialState, action: any) {
  switch (action.type) {
    case ENABLE_SPINNER: {
      return {
        ...state,
        loader: true,
      };
    }
    case DISABLE_SPINNER: {
      return {
        ...state,
        loader: false,
      };
    }

    default:
      return state;
  }
}

export default spinnerReducer;
