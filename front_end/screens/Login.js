import React, {useEffect} from 'react';
import {Button, StyleSheet, Text, TextInput, View, TouchableOpacity} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import Register from "./Register";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../store/actions/usersActions";
import BackOffice from "./BackOffice";
import Notification from "../components/Notification";

const Login = () => {

    const dispatch = useDispatch();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const err = useSelector(state => state.users.loginError);
    const navigation = useNavigation();

    const goToRegister = () => {
        navigation.navigate('Register');
    }

    const userAuthorized = useSelector(state => state.users.authorized);

    useEffect(() => {

        if (userAuthorized) {
            navigation.navigate('BackOffice');
        }
    }, []);

    const submit = () => {
        if (username && password) {
            const loginData = {
                user: {
                    username,
                    password
                }
            }
            dispatch(loginUser(loginData));
        } else {
            alert('Ой, вы что-то пропустили !')
        }
    }

    return (
        <View style={styles.container}>
            {err ? <View style={styles.badgeContainer}>
                <Notification err={err} color='red'/>
            </View> : null}
            <TextInput style={styles.input}
                       placeholder="Username"
                       value={username}
                       onChangeText={setUsername}
            />
            <TextInput style={styles.input}
                       placeholder="Password"
                       value={password}
                       onChangeText={setPassword}
                       secureTextEntry
            />
            <Button title="Войти" onPress={submit}/>
            <Text style={styles.text}>Если нет аккаунта, то зарегистрируйтесь. </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={goToRegister}
            >
                <Text>Регистрация</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        borderWidth: 1,
        borderRadius: 20,
        padding: 20,
        marginHorizontal: 5
    },
    input: {
        padding: 10,
        textAlign: 'center',
        borderWidth: 1,
        marginVertical: 5
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
    },
    text: {
        textAlign: 'center'
    },
    badgeContainer: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 20
    }
});

export default Login;