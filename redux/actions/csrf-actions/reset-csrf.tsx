import { RESET_USER_CSRF_TOKEN } from '../../action-types/csrf-type';


//Add csrf-token to state
export function resetCSRF() {
    return {
        type: RESET_USER_CSRF_TOKEN,
        payload: ""
    }
}