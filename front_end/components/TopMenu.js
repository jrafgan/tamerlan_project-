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
import {loginUserSuccess, logoutUser, setAuthorization} from "../store/actions/usersActions";
import BackOffice from "../screens/BackOffice";
import {getNewAds, getUserAllAds} from "../store/actions/adsActions";

const Menu = () => {
    const navigation = useNavigation();
    const onPressLogin = () => {
        //navigation.navigate('BackOffice')
    }
    return <Icon
        name='home' style={{color: '#fff', size: 30}} onPress={onPressLogin}/>
}

const Location = () => {
    return <GetGeoLocation/>
}

const Home = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const userState = useSelector(state => state.users);

    const onPressLogin = () => {
        navigation.navigate('Login');
    }

    const onPressBackOffice = () => {
        navigation.navigate('BackOffice');
    }

    const onPressRegister = () => {
        navigation.navigate('Register')
    }

    const onPressLogOut = () => {
        dispatch(logoutUser());
    }

    useEffect(() => {
        loadFromAsyncStorage().then(r => {
            if (!r) return;
            dispatch(getUserAllAds(r.id));
            dispatch(setAuthorization(true));
            dispatch(loginUserSuccess(r.username));
        }).catch(e => console.log('UE err TopMenu 61: ', e));
    }, [userState.user])

    return (!userState.authorized ? <View style={styles.backofficeView}><TouchableOpacity onPress={onPressLogin}>
        <Text style={styles.backofficeText}>Войти</Text>
    </TouchableOpacity>
        <TouchableOpacity onPress={onPressRegister}>
            <Text style={{color: '#fff'}}>Регистрация</Text>
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
                    leftComponent={<Menu/>}
                    centerComponent={<Location/>}
                    rightComponent={<Home/>}
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
        marginRight: 10,
        color: '#fff'
    }

});

export default TopMenu;