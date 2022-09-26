import {
  GET_CATEGORIES,
  ADD_CATEGORIES,
  UPDATE_CATEGORIES_PAGE_SIZE,
  UPDATE_CATEGORIES_PAGE,
} from "../action-types/categories-type";

const initialState = { results: [], page: 0, size: 100, total: 0 };

function categoryReducer(state: any = initialState, action: any) {
  switch (action.type) {
    case ADD_CATEGORIES: {
      return {
        ...state,
        results: action.payload.results,
        total: action.payload.total,
      };
    }
    case UPDATE_CATEGORIES_PAGE_SIZE: {
      return { ...state, size: action.payload };
    }
    case UPDATE_CATEGORIES_PAGE: {
      return { ...state, page: action.payload };
    }

    default:
      return state;
  }
}

export default categoryReducer;
