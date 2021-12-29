import React, {useEffect} from 'react';
import {StyleSheet, View, ScrollView, Dimensions} from 'react-native';
import TopMenu from '../components/TopMenu';
import Footer from '../components/Footer';
import {StatusBar} from 'expo-status-bar';
import ScreenBody from '../components/ScreenBody/ScreenBody';
import {useDispatch, useSelector} from 'react-redux';
import Preloader from "../components/Preloader";
import AppAdsBlock from "../components/AppAdsBlock";
import {getNewAds, getUserAllAds} from "../store/actions/adsActions";
import {loadFromAsyncStorage} from "../store/asyncStorage";
import {loginUserSuccess, setAuthorization} from "../store/actions/usersActions";

const height = Dimensions.get('window').height;

const HomeScreen = () => {

    const show = useSelector(state => state.ads.showPreloader);

    return (
        <View>
            <ScrollView keyboardShouldPersistTaps='never' contentContainerStyle={{height: '100%'}}>
                <View style={styles.container}>
                    <TopMenu/>
                    <AppAdsBlock/>
                    <ScreenBody/>
                    <Footer/>
                    <StatusBar style='auto'/>
                </View>
            </ScrollView>
            {show ? <View style={styles.container2}>
                <Preloader/>
            </View> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e5e3f3',
        alignItems: 'center',
    },
    container2: {
        flexGrow: 1,
        marginBottom: 0,
        padding: 0,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'black',
        opacity: 0.7,
        height: height,
    }
});

export default HomeScreen;
