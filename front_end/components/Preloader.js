import React, {Component} from 'react';
import { StyleSheet, View, Image, ActivityIndicator, Text } from 'react-native';
import {useDispatch} from "react-redux";
import {getCityNameByGeocode, preloaderHandler} from "../store/actions/adsActions";
import * as Location from "expo-location";

const Preloader = () => {

    const dispatch = useDispatch();

    const hidePreloader = () => {
        dispatch(preloaderHandler(false))
    }
    return (
        <View style={styles.container}>
            <Image onPress={hidePreloader} style={styles.activityIndicator} source={require('../assets/runningDog.gif')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        left: '25%',
        right: 0,
        top: '40%',
        bottom: 0
    },
    activityIndicator: {
        opacity: 0.7,
        height: 100,
        width: 200,

    }
});

export default Preloader;