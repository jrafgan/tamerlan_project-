import React, {useEffect, useState} from 'react'
import {View, StyleSheet} from 'react-native'
import CategoryPicker from './CategoryPicker';
import SearchResult from "./SearchResult";
import {useDispatch, useSelector} from "react-redux";
import CityPicker from "./CityPicker";
import {setCityToStore} from "../../store/actions/adsActions";
import PublishedAds from "./PublishedAds";

const ScreenBody = () => {
    const dispatch = useDispatch();

    const saveCity = value => {
        dispatch(setCityToStore(value));
    }
    return (
            <View style={styles.marginView}>
                <CityPicker saveHandler={saveCity}/>
                <CategoryPicker/>
                <SearchResult/>
                <PublishedAds />
            </View>
    )
}

const styles = StyleSheet.create({
    marginView: {
        marginTop: 5,
        marginHorizontal: 12,
        marginBottom: 50
    }
})

export default ScreenBody;