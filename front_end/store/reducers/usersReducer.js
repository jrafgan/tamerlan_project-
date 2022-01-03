import {
    USER_SUCCESS_HANDLER,
    LOGOUT_USER,
    SET_SUCCESS_MESSAGE,
    SET_ERROR_MESSAGE,
} from "../actions/usersActions";

const initialState = {
    registerError: null,
    loginError: null,
    user: '',
    userId: '',
    authorized: false,
    successMsg: '',
    errorMsg: '',
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {

        case USER_SUCCESS_HANDLER:
            return {...state, user: action.data.username, userId: action.data.id || action.data._id , authorized: true};

        case LOGOUT_USER:
            return {...state, user: '', userId: '', authorized: false};

        case SET_SUCCESS_MESSAGE:
            console.log('user reducer success : ', action.success)
            return {...state, successMsg: action.success};

        case SET_ERROR_MESSAGE:
            console.log('user reducer error : ', action.error)
            return {...state, errorMsg: action.error};

        default:
            return state;
    }
};

export default usersReducer;