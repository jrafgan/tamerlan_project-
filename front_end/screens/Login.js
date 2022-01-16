import React, {useEffect} from 'react';
import {Button, StyleSheet, Text, TextInput, View, TouchableOpacity} from 'react-native';
import {useNavigation} from "@react-navigation/native";
// import Register from "./Register";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../store/actions/usersActions";
import EmailForm from "./EmailForm";
// import BackOffice from "./BackOffice";

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

    const goToEmailForm = () => {
        navigation.navigate('EmailForm');
    }

    return (
        <View style={styles.container}>
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
            <Button title="Войти" onPress={submit} style={styles.button} disabled={!(username && password)}/>
            <Text style={styles.text}>Если нет аккаунта, то зарегистрируйтесь. </Text>
            <Button title="Регистрация" onPress={goToRegister} style={styles.button} />
            <Text style={styles.text}>Или</Text>
            <Button title="Забыли пароль ?" onPress={goToEmailForm} style={styles.button} />
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
        padding: 10,
    },
    text: {
        textAlign: 'center',
        marginVertical: 10
    },
    badgeContainer: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 20
    }
});

export default Login;