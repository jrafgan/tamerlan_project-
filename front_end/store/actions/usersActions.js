import axios from '../../axios-api';
import {clearAsyncStorage, loadFromAsyncStorage, saveToAsyncStorage} from "../asyncStorage";

export const SET_AUTHORIZATION = 'SET_AUTHORIZATION'; //todo delete type
export const USER_SUCCESS_HANDLER = 'USER_SUCCESS_HANDLER';
export const LOGOUT_USER = 'LOGOUT_USER';

export const SET_SUCCESS_MESSAGE = 'SET_SUCCESS_MESSAGE';
export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';

export const userSuccessHandler = data => ({type: USER_SUCCESS_HANDLER, data});
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
    console.log('response of interceptor : ', resData.user)

    if (token) {
        const data = {
            username: resData.user.username,
            token,
            id: resData.user._id
        };
        userSuccessHandler(data);
        await saveToAsyncStorage(data).then().catch(e => console.log(e))
    }
    return res;
}, err => Promise.reject(err));

export const notificationTimer = (func1, func2) => {
    return dispatch => {
        dispatch(func1);
        const timeoutId = setTimeout(function () {
            dispatch(func2);
            clearTimeout(timeoutId);
        }, 4000);
    }
}

export const errorHandler = (err, dispatch) => {
    console.log(err)
    /*console.log('error msg ; ', err.response.data.errors ? err.response.data.errors.username.properties.error : err.response.data.error);*/
    if (err) {
        /*if (err.response.data.error === 'Logout') { todo Logout function
        clearData();
            dispatch({type: LOGOUT_USER});
        }*/
        dispatch(notificationTimer(setErrorMsg(err.response.data.errors ? err.response.data.errors.username.properties.error : err.response.data.error), setErrorMsg(null)));
    } else {
        dispatch(notificationTimer(setErrorMsg('No network connection'), setErrorMsg(null)));
    }
}

const clearData = () => {
    return dispatch => {
        console.log('clear data triggered')
        dispatch({type: LOGOUT_USER});
        clearAsyncStorage().then().catch(e => console.log('user actions 82 : ', e));
    }
}

export const logoutUser = () => {
    return dispatch => {
        return axios.post('/users/logout').then(res => {
                dispatch(clearData());
                dispatch(notificationTimer(setSuccessMsg('Вы вышли !'), setSuccessMsg(null)));
            },
            err => errorHandler(err, dispatch));
    }
};

export const registerUser = userData => {
    return dispatch => {
        return axios.post('/users', userData).then(res => {
                dispatch(userSuccessHandler(res.data.user));
                dispatch(notificationTimer(setSuccessMsg(res.data.success), setSuccessMsg(null)));
            },
            err => errorHandler(err, dispatch));
    }
};

export const loginUser = userData => {
    return async dispatch => {
        return axios.post('/users/sessions', userData).then(res => {
                dispatch(userSuccessHandler(res.data.user));
                dispatch(notificationTimer(setSuccessMsg(res.data.success), setSuccessMsg(null)));
            },
            err => errorHandler(err, dispatch));
    }
};

export const checkEmail = emailObj => {
    return dispatch => {
        return axios.post('/users/email', emailObj).then(res => {
                dispatch(notificationTimer(setSuccessMsg(res.data.success), setSuccessMsg(null)));
            },
            err => errorHandler(err, dispatch));
    }
};

export const setNewPassword = passObj => {
    return dispatch => {
        return axios.put('/users', passObj).then(res => {
                dispatch(notificationTimer(setSuccessMsg(res.data.success), setSuccessMsg(null)));
            },
            err => errorHandler(err, dispatch));
    }
};

