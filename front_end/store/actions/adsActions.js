import axios from '../../axios-api';
import {notificationTimer} from "./usersActions";

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
export const FETCH_FAILURE = 'FETCH_FAILURE';

export const preloaderHandler = showPreloader => ({type: SHOW_PRELOADER, showPreloader});
export const setCatIdToStore = catId => ({type: SET_CAT_ID_TO_STORE, catId});
export const setCityToStore = city => ({type: SET_CITY_TO_STORE, city});
export const setAdToModify = ad => ({type: SET_MODIFY_AD, ad});
export const setAllAds = ads => ({type: SET_ALL_ADS_TO_STORE, ads});
export const fetchGeoLocationSuccess = location => ({type: FETCH_GEOLOCATION_SUCCESS, location});
export const fetchFailure = error => ({type: FETCH_FAILURE, error});

const errorHandler = (err, dispatch) => {
    if (err.response) {
        dispatch(fetchFailure(err.response.data));
    } else {
        dispatch(fetchFailure('No network connection '))
    }
}

export const getNewAds = () => {
    return dispatch => {
        return axios.get('/ads/admin').then( res => {
                dispatch(preloaderHandler(true));
                dispatch(setAllAds(res.data));
            },
            err => {
                errorHandler(err, dispatch)
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
                dispatch(notificationTimer(setSuccessMsg(res.data.message), setSuccessMsg(null)));
            },
            err => {
                if (err.response) {
                    dispatch(notificationTimer(fetchFailure(err.response.data.error.error), fetchFailure(null)));
                } else {
                    dispatch(notificationTimer(fetchFailure('No network connection'), fetchFailure(null)));
                }
            });
    };
};

export const editAd = adData => {
    return dispatch => {
        return axios.patch('/ads/', adData).then(res => {
                const data = res.data;
                dispatch(setAllAds(data.ads));
                dispatch(notificationTimer(setSuccessMsg(data.message), setSuccessMsg(null)));
                console.log('res patch : ', Object.keys(data));
            },
            err => {
                if (err.response) {
                    dispatch(notificationTimer(fetchFailure(err.response.data.error.error), fetchFailure(null)));
                } else {
                    dispatch(notificationTimer(fetchFailure('No network connection'), fetchFailure(null)));
                }
            });
    };
};

export const getUserAllAds = () => {
    return dispatch => {
        dispatch(preloaderHandler(true));
        return axios.get('/ads').then(res => {
                dispatch(setAllAds(res.data));
            },
            err => {
                console.log('login err : ', err);
                if (err.response) {
                    dispatch(notificationTimer(fetchFailure(err.response.data.error), fetchFailure(null)));
                } else {
                    dispatch(notificationTimer(fetchFailure('No network connection'), fetchFailure(null)));
                }
            });
    };
};

export class setErrorMsg {
}

export class setSuccessMsg {
}