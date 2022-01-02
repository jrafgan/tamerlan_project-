import axios from '../../axios-api';
import {clearAsyncStorage, loadFromAsyncStorage, saveToAsyncStorage} from "../asyncStorage";

export const REGISTER_USER_SUCCESS = 'REGISTER_USER _SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER _FAILURE';
export const SET_AUTHORIZATION = 'SET_AUTHORIZATION';

export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const LOGOUT_USER = 'LOGOUT_USER';

export const GET_HISTORY_SUCCESS = 'GET_HISTORY_SUCCESS';
export const SET_SUCCESS_MESSAGE = 'SET_SUCCESS_MESSAGE';
export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';

const registerUserSuccess = user => ({type: REGISTER_USER_SUCCESS, user});
export const loginUserSuccess = username => ({type: LOGIN_USER_SUCCESS, username});
const loginUserFailure = error => ({type: LOGIN_USER_FAILURE, error});
export const setAuthorization = authorized => ({type: SET_AUTHORIZATION, authorized});
export const setSuccessMsg = success => ({type: SET_SUCCESS_MESSAGE, success});
export const setErrorMsg = error => ({type: SET_ERROR_MESSAGE, error});

axios.interceptors.request.use(async req => {
    await loadFromAsyncStorage().then(r => {
        if (r) {
            req.headers['Authorization'] = r.token;
            req.headers['userId'] = r.id;
        }
    }).catch(e => console.log(e));
    return req;
}, err => Promise.reject(err));

axios.interceptors.response.use(async res => {
    const token = res.headers.authorization;
    const resData = res.data;

    // if (resData.success) {
    //     console.log('res success : ', resData.success);
    // }
    if (resData.error) {
        console.log('res error : ', resData.error);
        if (resData.error.error === 'Logout') {
            console.log('logout suppose to triggered : ')
        }
    }
    if (resData.user) {
        const data = {
            username: resData.user.username,
            token,
            id: resData.user._id
        };
        loginUserSuccess(resData.user.username);
        await saveToAsyncStorage(data).then().catch(e => console.log(e))
    }
    return res;
}, err => Promise.reject(err));

export const notificationTimer = (func1, func2) => {
    return dispatch => {
        dispatch(func1);
        const timeoutId = setTimeout(function () {
            console.log('timer stopped');
            dispatch(func2);
            clearTimeout(timeoutId);
        }, 4000);
        console.log('timer started');
    }
}

const errorHandler = (err, dispatch) => {
    if (err) {
        dispatch(notificationTimer(setErrorMsg(err.response.data.error), setErrorMsg(null)));
    } else {
        dispatch(notificationTimer(setErrorMsg('No network connection'), setErrorMsg(null)));
    }
}

export const logoutUser = () => {
    return dispatch => {
        return axios.post('/users/logout').then(res => {
                dispatch({type: LOGOUT_USER});
                clearAsyncStorage().then().catch(e => console.log('user actions 82 : ', e));
                dispatch(notificationTimer(setSuccessMsg('Вы вышли !'), setSuccessMsg(null)));
            },
            err => {
                errorHandler(err, dispatch);
            }
        )
    }
};

export const registerUser = userData => {
    return dispatch => {
        return axios.post('/users', userData).then(res => {
                dispatch(registerUserSuccess(res.data.user.username));
                dispatch(setAuthorization(true));
                dispatch(notificationTimer(setSuccessMsg(res.data.success), setSuccessMsg(null)));
            },
            err => {
                errorHandler(err, dispatch);
            }
        )
    }
};

export const loginUser = userData => {
    return async dispatch => {
        return axios.post('/users/sessions', userData).then(res => {
                dispatch(loginUserSuccess(res.data.user.username));
                dispatch(setAuthorization(true));
                dispatch(notificationTimer(setSuccessMsg(res.data.success), setSuccessMsg(null)));
            },
            err => {
                errorHandler(err, dispatch);
            })
    }
};
