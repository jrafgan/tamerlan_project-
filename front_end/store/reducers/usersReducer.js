import {
    USER_SUCCESS_HANDLER,
    LOGOUT_USER,
    SET_SUCCESS_MESSAGE,
    SET_ERROR_MESSAGE,
} from "../actions/usersActions";

const initialState = {
    user: '',
    userId: '',
    authorized: false,
    successMsg: '',
    errorMsg: '',
    token: ''
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {

        case USER_SUCCESS_HANDLER:
            return {...state, user: action.data.username, userId: action.data.id || action.data._id , authorized: true, token: action.data.token};

        case LOGOUT_USER:
            console.log('logout trigggered')
            return {...state, user: '', userId: '', authorized: false};

        case SET_SUCCESS_MESSAGE:
            return {...state, successMsg: action.success};

        case SET_ERROR_MESSAGE:
            console.log('user reducer error : ', action.error);
            return {...state, errorMsg: action.error};

        default:
            return state;
    }
};

export default usersReducer;