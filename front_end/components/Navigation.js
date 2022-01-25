import React from 'react';
import HomeScreen from "../screens/HomeScreen";
import BackOffice from "../screens/BackOffice";
import Login from "../screens/Login";
import Register from "../screens/Register";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from "react-redux";
import {StyleSheet, View} from "react-native";
import Notification from "./Notification";
import UserCreateAd from "./BackOffice/UserCreateAd/UserCreateAd";
import UserAdDetails from "./BackOffice/UserAdDetails/UserAdDetails";
import MessageDetails from "./BackOffice/Messages/MessageDetails";
import AdminAdDetails from "./BackOffice/AdminTabs/AdminAdDetails";
import EmailForm from "../screens/EmailForm";
import GuestAdDetails from "./ScreenBody/GuestAdDetails";

const Stack = createStackNavigator();

const Navigation = () => {
    const userState = useSelector(state => state.users);
    const adsState = useSelector(state => state.ads);
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={'Home'} screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="GuestAdDetails" component={GuestAdDetails}/>
                {userState.authorized ? <><Stack.Screen name="BackOffice" component={BackOffice}/>
                <Stack.Screen name="UserCreateAd" component={UserCreateAd}/>
                    <Stack.Screen name="UserAdDetails" component={UserAdDetails}/>
                    <Stack.Screen name="MessageDetails" component={MessageDetails}/>
                    <Stack.Screen name="AdminAdDetails" component={AdminAdDetails}/>
                    </> : <>
                    <Stack.Screen name="Login" component={Login}/>
                    <Stack.Screen name="Register" component={Register}/>
                    <Stack.Screen name="EmailForm" component={EmailForm}/>
                </>}
            </Stack.Navigator>
            {userState.successMsg || adsState.success || userState.errorMsg || adsState.error ? <View style={styles.badgeContainer}>
                <Notification message={userState.successMsg || adsState.success || userState.errorMsg || adsState.error} color={userState.successMsg || adsState.success ? '#00b300' : 'red'}/>
            </View> : null}
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    badgeContainer: {
        position: 'absolute',
        top: 100,
        left: 20,
        zIndex: 20
    }
});

export default Navigation;