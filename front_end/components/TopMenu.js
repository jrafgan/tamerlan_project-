import React, {useEffect} from 'react'
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native'
import {Header} from "react-native-elements";
import {Icon} from 'react-native-elements'
import {useNavigation} from '@react-navigation/native';
import GetGeoLocation from "./GetGeoLocation";
import Login from "../screens/Login";
import Register from "../screens/Register";
import {useDispatch, useSelector} from "react-redux";
import {loadFromAsyncStorage} from "../store/asyncStorage";
import {userSuccessHandler, logoutUser} from "../store/actions/usersActions";
import BackOffice from "../screens/BackOffice";
import {DELETE_ALL_ADS, getUserAllAds} from "../store/actions/adsActions";
import {DELETE_ALL_MESSAGES, getUserMessages} from "../store/actions/messagesActions";

const LeftElement = () => {
    const onPressLogin = () => {
        //navigation.navigate('BackOffice')
    }
    return <Icon
        name='menu' style={{color: '#fff', size: 30}} onPress={onPressLogin}/>
}

const Location = () => {
    return <GetGeoLocation/>
}

const RightElement = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const userState = useSelector(state => state.users);

    const onPressLogin = () => {
        navigation.navigate('Login');
    }

    const onPressBackOffice = async () => {
        dispatch({type: DELETE_ALL_ADS});
        await dispatch(getUserAllAds(userState.userId));
        await dispatch(getUserMessages(userState.userId));
        navigation.navigate('BackOffice');
    }

    const onPressRegister = () => {
        navigation.navigate('Register')
    }

    const onPressLogOut = () => {
        dispatch({type: DELETE_ALL_ADS});
        dispatch({type: DELETE_ALL_MESSAGES});
        console.log('onpress logout works');
        dispatch(logoutUser());
    }

    useEffect(() => {
        loadFromAsyncStorage().then(r => {
            if (!r) return;
            dispatch(getUserMessages(r.id));
            dispatch(userSuccessHandler(r));
        }).catch(e => console.log('UE err TopMenu 61: ', e));

}, []);

return (!userState.authorized ? <View style={styles.backofficeView}><TouchableOpacity onPress={onPressLogin}>
    <Text style={styles.backofficeText}>Войти</Text>
</TouchableOpacity>
    <TouchableOpacity onPress={onPressRegister}>
        <Text style={{color: '#fff'}}>Подать объявление</Text>
    </TouchableOpacity></View> : <View style={styles.backofficeView}><TouchableOpacity onPress={onPressBackOffice}>
    <Text style={styles.backofficeText}>Кабинет</Text>
</TouchableOpacity>
    <TouchableOpacity onPress={onPressLogOut}>
        <Text style={{color: '#fff'}}>Выйти</Text>
    </TouchableOpacity></View>)
}

const TopMenu = () => {
    return (
        <View style={styles.topMenu}>
            <Header style={styles.topMenu}
                    placement="left"

                    centerComponent={<Location/>}
                    rightComponent={<RightElement/>}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    topMenu: {
        margin: 0,
        padding: 0
    },
    backofficeView: {
        flexDirection: 'row',
        flexWrap: 'nowrap'
    },
    backofficeText: {
        marginRight: 20,
        color: '#fff'
    }
});

export default TopMenu;
