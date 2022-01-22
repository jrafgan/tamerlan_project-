import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, ScrollView, TouchableOpacity} from "react-native";
import {Header, Icon} from "react-native-elements";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../store/actions/usersActions";
import BackOfficeTabs from "../components/BackOffice/BackOfficeTabs";
import {DELETE_ALL_ADS, getUserAllAds} from "../store/actions/adsActions";
import {getUserMessages} from "../store/actions/messagesActions";
import DropDownMenu from "../components/BackOffice/DropDownMenu";

const BackOffice = () => {
    const state = useSelector(state => state.users);
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const LeftElelement = () => {
        const toggleMenu = () => {
            setShowMenu(!showMenu)
        }
        return <Icon
            name='menu' style={{color: '#fff', size: 30}} onPress={toggleMenu}/>
    }

    const MiddleElement = () => {
        return <Text style={styles.topMenu}>Привет, {state.user} !</Text>
    }

    const RightElement = () => {
        const navigation = useNavigation();
        const onPressLogOut = () => {
            dispatch(logoutUser())
            navigation.navigate('Home');
        }

        const onPress = () => {
            navigation.goBack()
        }

        return <View style={styles.backofficeView}><TouchableOpacity onPress={onPress}>
            <Text style={styles.backofficeText}>Главная</Text>
        </TouchableOpacity>
            <TouchableOpacity onPress={onPressLogOut}>
                <Text style={{color: '#fff'}}>Выйти</Text>
            </TouchableOpacity></View>
    }

    return (
        <View style={styles.container}>
            <Header
                placement="left"
                leftComponent={<LeftElelement/>}
                centerComponent={<MiddleElement/>}
                rightComponent={<RightElement/>}
            />
            <ScrollView>
                {showMenu ? <DropDownMenu/> : null}
                <Text style={styles.header}>Чтобы загружать фото или скриншоты, сперва надо загрузить свои фото на Google photos или другие сайты.</Text>
                <Text style={styles.header}>И далее скопировать URL ссылку на фото. Скопированныую ссылку вставляете в форму для фото или скриншотов.</Text>
                <Text style={styles.header}>Обязательно разделяйте ссыкли на фото запятой, не то фото не отобразяться.</Text>
                <BackOfficeTabs/>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    header: {
        fontSize: 18,
        marginTop: 20
    },
    topMenu: {
        color: '#fff'
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

export default BackOffice;