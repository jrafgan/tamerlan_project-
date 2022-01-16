import {
    SET_ALL_MESSAGES_TO_STORE,
    SET_MESSAGE_DETAILS,
    DELETE_ALL_MESSAGES
} from "../actions/messagesActions";

const initialState = {
    allMessages: [],
    msgToReply: null
};

const messagesReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_ALL_MESSAGES_TO_STORE:
            return {...state, allMessages: action.messages};

        case SET_MESSAGE_DETAILS:
            return {...state, msgToReply: action.msg};

        case DELETE_ALL_MESSAGES:
            console.log('delete all msgs reucer triggered');
            return {...state, allMessages: [], msgToReply: null};

        default:
            return state;
    }
};

export default messagesReducer;