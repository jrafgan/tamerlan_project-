import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, ScrollView} from "react-native";
import {Header} from "react-native-elements";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../store/actions/usersActions";
import BackOfficeTabs from "../components/BackOffice/BackOfficeTabs";

const BackOffice = () => {
    const state = useSelector(state => state.users);
    const dispatch = useDispatch();

    const Menu = () => {
        const navigation = useNavigation();
        const onPress = () => {
            navigation.goBack()
        }
        return <Pressable onPress={onPress}>
            <Text style={styles.topMenu}>Главная</Text>
        </Pressable>
    }

    const WebSiteName = () => {
        return <Text style={styles.topMenu}>Привет, {state.user} !</Text>
    }

    const Home = () => {
        const navigation = useNavigation();
        const onPressLogOut = () => {
            dispatch(logoutUser())
            navigation.navigate('Home');
        }

        return <Pressable onPress={onPressLogOut}>
            <Text style={styles.topMenu}>Выйти</Text>
        </Pressable>
    }

    return (
        <View style={styles.container}>
            <Header
                placement="center"
                leftComponent={<Menu/>}
                centerComponent={<WebSiteName/>}
                rightComponent={<Home/>}
            />
            <ScrollView>
                <Text style={styles.header}>Чтобы загружать фото или скриншоты, сперва надо загрузить свои фото на Google photos</Text>
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
        fontSize: 18
    },
    topMenu: {
        color: '#fff'
    }
});

export default BackOffice;