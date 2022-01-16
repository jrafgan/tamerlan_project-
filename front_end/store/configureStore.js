import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import usersReducer from "./reducers/usersReducer";
import messageReducer from "./reducers/messagesReducer";
import { persistStore, persistReducer } from 'redux-persist'
import thunkMiddleware from "redux-thunk";
import adsReducer from "./reducers/adsReducer";
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['user', 'artist']
};

const rootReducer = combineReducers({
    ads: adsReducer,
    users: usersReducer,
    messages: messageReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [
    thunkMiddleware
];

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, enhancers);

export default () => {
    const persistor = persistStore(store);
    return {store, persistor}
}
