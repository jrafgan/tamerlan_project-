import axios from '../../axios-api';
import {LOGOUT_USER, logoutUser, notificationTimer} from "./usersActions";

export const SHOW_PRELOADER = 'SHOW_PRELOADER';
export const SET_CAT_ID_TO_STORE = 'SET_CAT_ID_TO_STORE';
export const SET_CITY_TO_STORE = 'SET_CITY_TO_STORE';
export const SET_KEY_WORD_TO_STORE = 'SET_KEY_WORD_TO_STORE';
export const SET_YOULA_URL2_TO_STORE = 'SET_YOULA_URL2_TO_STORE';
export const SET_AVITO_URL2_TO_STORE = 'SET_AVITO_URL2_TO_STORE';
export const SET_MODIFY_AD = 'SET_MODIFY_AD';

export const SET_TEST_HTML = 'SET_TEST_HTML';
export const KEYWORD_IS_NULL_WARNING = 'KEYWORD_IS_NULL_WARNING';

export const SET_ALL_ADS_TO_STORE = 'SET_ALL_ADS_TO_STORE';
export const FETCH_GEOLOCATION_SUCCESS = 'FETCH_GEOLOCATION_SUCCESS';
export const SET_SUCCESS_MSG = 'SET_SUCCESS_MSG';
export const SET_ERROR_MSG = 'SET_ERROR_MSG';

export const preloaderHandler = showPreloader => ({type: SHOW_PRELOADER, showPreloader});
export const setCatIdToStore = catId => ({type: SET_CAT_ID_TO_STORE, catId});
export const setCityToStore = city => ({type: SET_CITY_TO_STORE, city});
export const setAdToModify = ad => ({type: SET_MODIFY_AD, ad});
export const setAllAds = ads => ({type: SET_ALL_ADS_TO_STORE, ads});
export const fetchGeoLocationSuccess = location => ({type: FETCH_GEOLOCATION_SUCCESS, location});
export const setErrorMessage = error => ({type: SET_ERROR_MSG, error});
export const setSuccessMessage = success => ({type: SET_SUCCESS_MSG, success});

const errorHandler = (err, dispatch) => {
    console.log('errHandler : ', err.response.data.error);
    if (err) {
        if (err.response.data.error === 'Logout') {
            dispatch(notificationTimer(setErrorMessage('Войдите заново.'), setErrorMessage(null)));
            dispatch(logoutUser());
        } else {
            dispatch(notificationTimer(setErrorMessage(err.response.data), setErrorMessage(null)));
        }
    } else {
        dispatch(notificationTimer(setErrorMessage('No network connection '), setErrorMessage(null)));
    }
}

export const getNewAds = () => {
    return dispatch => {
        return axios.get('/ads/admin').then( res => {
                dispatch(preloaderHandler(true));
                dispatch(setAllAds(res.data));
            },
            err => {
                errorHandler(err, dispatch);
            });
    };
};

export const getCityNameByGeocode = (url) => {
    return dispatch => {
        return axios.get(url).then(
            response => {
                let data;
                if (response.data.city) {
                    data = response.data.city;
                } else {
                    data = response.data.localityInfo.administrative;
                    data = data.filter(obj => obj.adminLevel === 4)[0].name;
                }
                dispatch(fetchGeoLocationSuccess(data));
            }, error => {
                errorHandler(error, dispatch)
            });
    };
};

export const createAd = adData => {
    return dispatch => {
        return axios.post('/ads/', adData).then(res => {
                console.log('creatAd req, all ads : ', res.data);
                dispatch(setAllAds(res.data.advs));
                dispatch(notificationTimer(setSuccessMessage(res.data.success), setSuccessMessage(null)));
            },
            err => {
                errorHandler(err, dispatch)
            });
    };
};

export const editAd = adData => {
    return dispatch => {
        return axios.patch('/ads/', adData).then(res => {
                console.log('edited req, all ads : ', res.data);
                dispatch(setAllAds(res.data.advs));
                dispatch(notificationTimer(setSuccessMessage(res.data.success), setSuccessMessage(null)));
            },
            err => {
                errorHandler(err, dispatch)
            });
    };
};

export const getUserAllAds = () => {
    return dispatch => {
        dispatch(preloaderHandler(true));
        return axios.get('/ads').then(res => {
                console.log('all ads : ', res.data);
                dispatch(setAllAds(res.data));
            },
            err => {
                errorHandler(err, dispatch)
            });
    };
};
