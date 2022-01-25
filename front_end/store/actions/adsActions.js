import axios from '../../axios-api';
import {logoutUser, notificationTimer} from "./usersActions";

export const SHOW_PRELOADER = 'SHOW_PRELOADER';
export const SET_PUBLISHED_ADS = 'SET_PUBLISHED_ADS';
export const SET_PAID_ADS = 'SET_PAID_ADS';
export const SET_CAT_ID_TO_STORE = 'SET_CAT_ID_TO_STORE';
export const SET_CITY_TO_STORE = 'SET_CITY_TO_STORE';
export const SET_KEY_WORD_TO_STORE = 'SET_KEY_WORD_TO_STORE';
export const SET_YOULA_URL2_TO_STORE = 'SET_YOULA_URL2_TO_STORE';
export const SET_AVITO_URL2_TO_STORE = 'SET_AVITO_URL2_TO_STORE';
export const SET_MODIFY_AD = 'SET_MODIFY_AD';

export const DELETE_ALL_ADS = 'DELETE_ALL_ADS';
export const KEYWORD_IS_NULL_WARNING = 'KEYWORD_IS_NULL_WARNING';

export const SET_ALL_ADS_TO_STORE = 'SET_ALL_ADS_TO_STORE';
export const FETCH_GEOLOCATION_SUCCESS = 'FETCH_GEOLOCATION_SUCCESS';
export const SET_SUCCESS_MSG = 'SET_SUCCESS_MSG';
export const SET_ERROR_MSG = 'SET_ERROR_MSG';

export const preloaderHandler = showPreloader => ({type: SHOW_PRELOADER, showPreloader});
export const setPublishedAds = advs => ({type: SET_PUBLISHED_ADS, advs});
export const setPaidAds = paidAdvs => ({type: SET_PAID_ADS, paidAdvs});
export const setCatIdToStore = catId => ({type: SET_CAT_ID_TO_STORE, catId});
export const setCityToStore = city => ({type: SET_CITY_TO_STORE, city});
export const setAdToModify = ad => ({type: SET_MODIFY_AD, ad});
export const setAllAds = advs => ({type: SET_ALL_ADS_TO_STORE, advs});
export const fetchGeoLocationSuccess = location => ({type: FETCH_GEOLOCATION_SUCCESS, location});
export const setErrorMessage = error => ({type: SET_ERROR_MSG, error});
export const setSuccessMessage = success => ({type: SET_SUCCESS_MSG, success});

const adsErrorHandler = (err, dispatch) => {
    try {
        if (err) {
            if (err.response.data.error === 'Logout') {
                dispatch(notificationTimer(setErrorMessage('Войдите заново.'), setErrorMessage(null)));
                dispatch(logoutUser());
            } else {
                dispatch(notificationTimer(setErrorMessage(err.response.data.error), setErrorMessage(null)));
            }
        } else {
            dispatch(notificationTimer(setErrorMessage('No network connection '), setErrorMessage(null)));
        }
    } catch(e) {
        console.log(e);
    }
}

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
                adsErrorHandler(error, dispatch)
            });
    };
};

export const createAd = adData => {
    return dispatch => {
        return axios.post('/ads/', adData).then(res => {
                dispatch(setAllAds(res.data.advs));
                dispatch(notificationTimer(setSuccessMessage(res.data.success), setSuccessMessage(null)));
            },
            err => {
                adsErrorHandler(err, dispatch)
            });
    };
};

export const removeAd = adId => {
    return dispatch => {
        return axios.delete('/ads/' + adId).then(res => {
                dispatch(setAllAds(res.data.advs));
                dispatch(notificationTimer(setSuccessMessage(res.data.success), setSuccessMessage(null)));
            },
            err => {
                adsErrorHandler(err, dispatch)
            });
    };
};

export const editAd = adData => {
    return dispatch => {
        return axios.patch('/ads/', adData).then(res => {
                dispatch(setAllAds(res.data.advs));
                dispatch(notificationTimer(setSuccessMessage(res.data.success), setSuccessMessage(null)));
            },
            err => {
                adsErrorHandler(err, dispatch)
            });
    };
};

export const getUserAllAds = () => {
    return dispatch => {
        // dispatch(preloaderHandler(true));
        return axios.get('/ads/user').then(res => {
                const resData = res.data;
                if (resData.success) {
                    return dispatch(notificationTimer(setSuccessMessage(resData.success), setSuccessMessage(null)));
                }
                dispatch(setAllAds(resData.advs));
            },
            err => {
                adsErrorHandler(err, dispatch)
            });
    };
};

export const getPublishedAds = () => {
    // dispatch(preloaderHandler(true));
    return dispatch => {
        dispatch(setPaidAds(null));
        return axios.get('/ads').then(res => {
                const resData = res.data;
                dispatch(setPublishedAds(resData.advs));
                // dispatch(setPaidAds(resData.paidAdvs));
                if (resData.success) {
                    dispatch(notificationTimer(setSuccessMessage(resData.success), setSuccessMessage(null)));
                }
            },
            err => {
                adsErrorHandler(err, dispatch)
            });
    };
};

