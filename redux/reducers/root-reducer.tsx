import { combineReducers } from "redux";
import csrfReducer from "./csrf-reducer";
import categoryReducer from "./category-reducer";
import collectionReducer from "./collection-reducer";
import assetsReducer from "./assets-reducer";
import spinnerRedcuer from "./spinner-reducer";

export default combineReducers({
  csrf: csrfReducer,
  category:categoryReducer,
  collection:collectionReducer,
  asset:assetsReducer,
  spinner:spinnerRedcuer
});
