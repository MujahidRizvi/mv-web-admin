import { ADD_USER_CSRF_TOKEN } from '../../action-types/csrf-type';

//Add csrf-token to state
export function addCSRFToken(csrfToken:any) {
    return {
        type: ADD_USER_CSRF_TOKEN,
        payload: csrfToken
    }
}