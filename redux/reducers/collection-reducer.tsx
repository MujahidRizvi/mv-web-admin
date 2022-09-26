import {
  ADD_COLLECTION,
  UPDATE_COLLECTION_PAGE,
  UPDATE_COLLECTION_PAGE_SIZE,
} from "../action-types/collection-type";

const initialState = { results: [], page: 0, size: 100, total: 0 };

function collectionReducer(state: any = initialState, action: any) {
  switch (action.type) {
    case ADD_COLLECTION: {
      return {
        ...state,
        results: action.payload.results,
        total: action.payload.total,
      };
    }
    case UPDATE_COLLECTION_PAGE_SIZE: {
      return { ...state, size: action.payload };
    }
    case UPDATE_COLLECTION_PAGE: {
      return { ...state, page: action.payload };
    }

    default:
      return state;
  }
}

export default collectionReducer;
