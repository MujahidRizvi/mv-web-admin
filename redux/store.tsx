import { createStore } from "redux";
import rootReducer from "./reducers/root-reducer";

function configureStore() {
    return createStore(rootReducer);
}

export default configureStore;