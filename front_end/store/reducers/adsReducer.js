import {
    SET_KEY_WORD_TO_STORE,
    SET_CAT_ID_TO_STORE,
    SET_CITY_TO_STORE,
    SET_YOULA_URL2_TO_STORE,
    SET_AVITO_URL2_TO_STORE,
    SHOW_PRELOADER,
    FETCH_FAILURE,
    KEYWORD_IS_NULL_WARNING,
    SET_TEST_HTML,
    FETCH_GEOLOCATION_SUCCESS,
    SET_ALL_ADS_TO_STORE,
    SET_MODIFY_AD
} from '../actions/adsActions';

const initialState = {
    showPreloader: false,
    catId: '',
    city: '',
    keyWord: '',
    youlaUrl2: '',
    avitoUrl2: '',
    expensiveAds: null,
    allAds: null,
    cheapAds: null,
    warning: false,
    location: '',
    testHTML: null,
    error: null,
    modifyingAd: null,
};

const adsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_PRELOADER:
            return {...state, showPreloader: action.showPreloader};

        case SET_CAT_ID_TO_STORE:
            return {...state, catId: action.catId};

        case SET_CITY_TO_STORE:
            return {...state, city: action.city};

        case SET_MODIFY_AD:
            console.log('reducer modify ad : ', action.ad)
            return {...state, modifyingAd: action.ad};

        case SET_KEY_WORD_TO_STORE:
            return {...state, keyWord: action.keyWord};

        case SET_YOULA_URL2_TO_STORE:
            return {...state, youlaUrl2: action.youlaUrl2};

        case SET_AVITO_URL2_TO_STORE:
            return {...state, avitoUrl2: action.avitoUrl2};

        case SET_TEST_HTML:
            return {...state, testHTML: action.testHTML, showPreloader: false};

        case SET_ALL_ADS_TO_STORE:
            return {...state, allAds: action.ads, showPreloader: false};

        case KEYWORD_IS_NULL_WARNING:
            return {...state, warning: action.warning};

        case FETCH_GEOLOCATION_SUCCESS:
            return {...state, location: action.location};

        case FETCH_FAILURE:
            return {...state, error: action.error, showPreloader: false};

        default:
            return state;
    }
};

export default adsReducer;