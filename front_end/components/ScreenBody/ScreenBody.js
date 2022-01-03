import React, {useEffect, useState} from 'react'
import {SafeAreaView, StyleSheet, View} from 'react-native'
import AppAdsBlock from '../AppAdsBlock';
import CategoryPicker from './CategoryPicker';
import SearchResult from "./SearchResult";
import {useDispatch, useSelector} from "react-redux";
import CityPicker from "./CityPicker";
import {getNewAds, getUserAllAds, setCityToStore} from "../../store/actions/adsActions";
import {loadFromAsyncStorage} from "../../store/asyncStorage";
import {userSuccessHandler, setAuthorization} from "../../store/actions/usersActions";

const ScreenBody = () => {

    const ads = useSelector(state => state.ads.allAds);
    const dispatch = useDispatch();

     useEffect(() => {
        if (ads) changeMarginBottom(0);
     });
    const [marginBottom, changeMarginBottom] = useState(133);

    const saveCity = value => {
        dispatch(setCityToStore(value));
    }
    return (
        <>

            <View style={{
                marginTop: 5,
                marginHorizontal: 12,
                marginBottom: 0
            }}>
                <CityPicker saveHandler={saveCity} />
                <CategoryPicker/>
                <SearchResult/>
            </View>
        </>
    )
}

export default ScreenBody;