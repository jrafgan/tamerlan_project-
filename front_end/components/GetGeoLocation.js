import React, {useState, useEffect} from 'react';
import {Platform, Text, View, StyleSheet} from 'react-native';
import * as Location from 'expo-location';
import {useDispatch, useSelector} from "react-redux";
import {getCityNameByGeocode, setCityToStore} from "../store/actions/adsActions";
import {citiesArr, citiesEn, citiesRu} from "../constants";

export default function GetGeoLocation() {

    const [errorMsg, setErrorMsg] = useState(null);
    const clientLocation = useSelector(state => state.ads.location);
    const dispatch = useDispatch();
    let text = 'Ищем ваши координаты..';

    useEffect(() => {
            (async () => {
                let {status} = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
                }

                //let location = await Location.getCurrentPositionAsync({});
                // let location = await Location.getLastKnownPositionAsync({});
                let location = await Location.watchPositionAsync(
                    {
                        enableHighAccuracy: true,
                        distanceInterval: 1,
                        timeInterval: 1000
                    },
                    newLocation => {
                        let coords = newLocation.coords;
                        dispatch(getCityNameByGeocode(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coords.latitude}&longitude=${coords.longitude}&localityLanguage=ru`));

                    },
                );
            })();
    }, []);

    if (errorMsg) {
        text = errorMsg;
    } else if (clientLocation) {
        text = `${clientLocation}`
    }

    return (
        <View style={styles.container}>
            <Text style={styles.paragraph}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    paragraph: {
        fontSize: 14,
        textAlign: 'center',
        color: '#fff'
    },
});
