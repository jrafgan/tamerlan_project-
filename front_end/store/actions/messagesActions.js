import axios from '../../axios-api';
import {errorHandler, notificationTimer, setSuccessMsg, USER_SUCCESS_HANDLER} from "./usersActions";

export const SET_ALL_MESSAGES_TO_STORE = 'SET_ALL_MESSAGES_TO_STORE';
export const SET_MESSAGE_DETAILS = 'SET_MESSAGE_DETAILS';
export const DELETE_ALL_MESSAGES = 'DELETE_ALL_MESSAGES';

export const  setAllMessagesToStore= messages => ({type: SET_ALL_MESSAGES_TO_STORE, messages});
export const  setMsgToReply= msg => ({type: SET_MESSAGE_DETAILS, msg});

export const sendMessage = messageData => {
    return async dispatch => {
        return axios.post('/messages/', messageData).then(res => {
                const resData = res.data;
                if (resData.messages) {
                    dispatch(setAllMessagesToStore(resData.messages));
                    dispatch(notificationTimer(setSuccessMsg(resData.success), setSuccessMsg(null)));
                }
            },
            err => {
                errorHandler(err, dispatch);
            })
    }
};

export const getUserMessages = () => {
    return async dispatch => {
        return axios.get('/messages/').then(res => {
                const resData = res.data;
                if (resData.messages) {
                    dispatch(setAllMessagesToStore(res.data.messages));
                }
            },
            err => {
                errorHandler(err, dispatch);
            })
    }
};

export const markMsgAsRead = id => {
    return async dispatch => {
        return axios.patch('/messages/' + id).then(res => {
                const resData = res.data;
                if (resData.messages) {
                    dispatch(setAllMessagesToStore(res.data.messages));
                }
            },
            err => {
                errorHandler(err, dispatch);
            })
    }
};