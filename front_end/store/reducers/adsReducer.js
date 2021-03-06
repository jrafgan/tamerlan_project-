import {
    SET_KEY_WORD_TO_STORE,
    SET_CAT_ID_TO_STORE,
    SET_CITY_TO_STORE,
    SET_YOULA_URL2_TO_STORE,
    SET_AVITO_URL2_TO_STORE,
    SHOW_PRELOADER,
    KEYWORD_IS_NULL_WARNING,
    DELETE_ALL_ADS,
    FETCH_GEOLOCATION_SUCCESS,
    SET_ALL_ADS_TO_STORE,
    SET_MODIFY_AD,
    SET_SUCCESS_MSG,
    SET_ERROR_MSG,
    SET_PUBLISHED_ADS,
    SET_PAID_ADS
} from '../actions/adsActions';

const initialState = {
    showPreloader: false,
    catId: '',
    city: '',
    keyWord: '',
    youlaUrl2: '',
    avitoUrl2: '',
    allAds: null,
    paidAds: null,
    warning: false,
    location: '',
    error: '',
    success: '',
    modifyingAd: null,
    publishedAds: null
};

const adsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_PRELOADER:
            return {...state, showPreloader: action.showPreloader};

        case SET_PUBLISHED_ADS:
            return {...state, publishedAds: action.advs, showPreloader: false};

        case SET_PAID_ADS:
            return {...state, paidAds: action.paidAdvs};

        case SET_CAT_ID_TO_STORE:
            return {...state, catId: action.catId};

        case SET_CITY_TO_STORE:
            return {...state, city: action.city};

        case SET_MODIFY_AD:
            return {...state, modifyingAd: action.ad};

        case SET_KEY_WORD_TO_STORE:
            return {...state, keyWord: action.keyWord};

        case SET_YOULA_URL2_TO_STORE:
            return {...state, youlaUrl2: action.youlaUrl2};

        case SET_AVITO_URL2_TO_STORE:
            return {...state, avitoUrl2: action.avitoUrl2};

        case DELETE_ALL_ADS:
            return {...state, allAds: null};

        case SET_ALL_ADS_TO_STORE:
            return {...state, allAds: action.advs, showPreloader: false};

        case KEYWORD_IS_NULL_WARNING:
            return {...state, warning: action.warning};

        case FETCH_GEOLOCATION_SUCCESS:
            return {...state, location: action.location};

        case SET_SUCCESS_MSG:
            return {...state, success: action.success};

        case SET_ERROR_MSG:
            return {...state, error: action.error, showPreloader: false};

        default:
            return state;
    }
};

export default adsReducer;