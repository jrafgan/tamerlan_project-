import React, {useEffect} from 'react';
import HomeScreen from "../screens/HomeScreen";
import BackOffice from "../screens/BackOffice";
import Login from "../screens/Login";
import Register from "../screens/Register";
import {NavigationContainer, useNavigation} from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from "react-redux";
import {StyleSheet, View} from "react-native";
import Notification from "./Notification";
import UserCreateAd from "./BackOffice/UserCreateAd/UserCreateAd";
import UserAdDetails from "./BackOffice/UserAdDetails/UserAdDetails";
import AdminAdDetails from "./BackOffice/AdminTabs/AdminAdDetails";

const Stack = createStackNavigator();

const Navigation = () => {
    const userAuthorized = useSelector(state => state.users.authorized);
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={'Home'} screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="Home" component={HomeScreen}/>
                {userAuthorized ? <><Stack.Screen name="BackOffice" component={BackOffice}/>
                <Stack.Screen name="UserCreateAd" component={UserCreateAd}/>
                    <Stack.Screen name="UserAdDetails" component={UserAdDetails}/>
                    <Stack.Screen name="AdminAdDetails" component={AdminAdDetails}/>
                    </> : <>
                    <Stack.Screen name="Login" component={Login}/>
                    <Stack.Screen name="Register" component={Register}/>
                </>}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;