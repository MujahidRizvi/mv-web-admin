import {
  ADD_ASSETS,
  GET_ASSET_TYPES,
  UPDATE_ASSETS_PAGE,
  UPDATE_ASSETS_PAGE_SIZE,
} from "../action-types/assets-type";

const initialState = { results: [], page: 0, size: 100, total: 0,assetTypes:[] };

function assetsReducer(state: any = initialState, action: any) {
  switch (action.type) {
    case ADD_ASSETS: {
      return {
        ...state,
        results: action.payload.result,
        total: action.payload.total,
      };
    }
    case GET_ASSET_TYPES: {
      return {
        ...state,
        assetTypes: action.payload,
      };
    }
    case UPDATE_ASSETS_PAGE_SIZE: {
      return { ...state, size: action.payload };
    }
    case UPDATE_ASSETS_PAGE: {
      return { ...state, page: action.payload };
    }

    default:
      return state;
  }
}

export default assetsReducer;
