import {
    GET_HISTORY_SUCCESS,
    SET_AUTHORIZATION,
    LOGIN_USER_FAILURE,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER,
    REGISTER_USER_FAILURE,
    REGISTER_USER_SUCCESS,
    SET_SUCCESS_MESSAGE,
    SET_ERROR_MESSAGE,
} from "../actions/usersActions";
import {clearAsyncStorage} from "../asyncStorage";

const initialState = {
    registerError: null,
    loginError: null,
    history: null,
    user: '',
    userId: '',
    authorized: false,
    successMsg: '',
    errorMsg: '',
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {

        case REGISTER_USER_SUCCESS:
            return {...state, user: action.user, registerError: null};

        case REGISTER_USER_FAILURE:
            return {...state, registerError: action.error};

        case SET_AUTHORIZATION:
            return {...state, authorized: action.authorized};

        case LOGIN_USER_SUCCESS:
            return {...state, user: action.username, authorized: true};

        case LOGIN_USER_FAILURE:
            return {...state, loginError: action.error};

        case LOGOUT_USER:
            return {...state, user: null, authorized: false};

        case SET_SUCCESS_MESSAGE:
            console.log('user reducer success : ', action.success)
            return {...state, successMsg: action.success};

        case SET_ERROR_MESSAGE:
            console.log('user reducer error : ', action.error)
            return {...state, errorMsg: action.error};

        case GET_HISTORY_SUCCESS:
            return {...state, history: action.history};

        default:
            return state;
    }
};

export default usersReducer;