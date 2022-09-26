import { ADD_USER_CSRF_TOKEN, RESET_USER_CSRF_TOKEN } from '../action-types/csrf-type';

const initialState = { csrf: "" };

function userReducer(state:any = initialState, action: any) {
    switch (action.type) {
        case ADD_USER_CSRF_TOKEN:
            state.csrf = action.payload;
        case RESET_USER_CSRF_TOKEN:
            state.csrf = action.payload;
        default:
            return state;
    }
}

export default userReducer;