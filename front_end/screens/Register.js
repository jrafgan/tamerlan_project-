import React, {useEffect} from 'react';
import {Button, StyleSheet, TextInput, View, Text} from 'react-native';
import {registerUser} from "../store/actions/usersActions";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
// import BackOffice from "./BackOffice";
// import Notification from "../components/Notification";

const Register = () => {
    const dispatch = useDispatch();
    const err = useSelector(state => state.users.registerError);
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [warning, setWarning] = React.useState(false);
    const [password, setPassword] = React.useState('');
    const [retyped, setRetyped] = React.useState('');

    const navigation = useNavigation();

    const userAuthorized = useSelector(state => state.users.authorized);

    useEffect(() => {
        if (userAuthorized) {
            navigation.navigate('BackOffice');
        }
    }, []);

    const submit = () => {
        if (username && email && password === retyped) {
            const registerData = {
                user: {
                    username,
                    email,
                    password
                }
            };

            dispatch(registerUser(registerData))
        } else {
            alert('Ой, вы что-то пропустили !')
        }
    }

    const validate = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
            setWarning(true);
            setEmail(text)
            return false;
        } else {
            setWarning(false);
            setEmail(text);
        }
    }

    return (
        <View style={styles.container}>
            {/*{err ? <View style={styles.badgeContainer}>*/}
            {/*    <Notification err={err} color='red'/>*/}
            {/*</View> : null}*/}
            <TextInput style={styles.input}
                       placeholder="Имя пользователя"
                       value={username}
                       onChangeText={setUsername}
            />
            <TextInput style={styles.input}
                       placeholder="Ваш eMail"
                       onChangeText={validate}
                       value={email}
            />
            {warning ? <Text style={styles.warningText}>Не правильный E-mail</Text> : null}
            <TextInput style={styles.input}
                       placeholder="Пароль"
                       value={password}
                       onChangeText={setPassword}
                       secureTextEntry
            />
            <TextInput style={styles.input}
                       placeholder="Повторите пароль"
                       value={retyped}
                       onChangeText={setRetyped}
                       secureTextEntry
            />
            {password ? (password && retyped !== password ?
                <Text style={styles.warningText}>Пароль не совпадает.</Text> :
                <Text style={styles.okText}>Пароль cовпал</Text>) : null}
            <Button title="Зарегистрироваться" onPress={submit}/>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        borderWidth: 1,
        borderRadius: 20,
        padding: 20
    },
    input: {
        padding: 10,
        textAlign: 'center',
        borderWidth: 1,
        marginVertical: 5
    },
    warningText: {
        color: 'red'
    },
    okText: {
        color: 'green'
    },
    badgeContainer: {
        position: 'absolute',
        top: 100,
        left: 20,
        zIndex: 20
    }
});

export default Register;