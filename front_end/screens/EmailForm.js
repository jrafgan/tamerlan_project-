import React from 'react';
import {Button, StyleSheet, Text, TextInput, View} from "react-native";
import {useDispatch} from "react-redux";
import {checkEmail} from "../store/actions/usersActions";
import {useNavigation} from "@react-navigation/native";

const EmailForm = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = React.useState('');
    const navigation = useNavigation();
    const [warning, setWarning] = React.useState(false);
    const [disable, setDisable] = React.useState(true);

    const sendEmail = async () => {
        if (email) {
            await dispatch(checkEmail({email}));
            navigation.navigate('Login');
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
            setDisable(false)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Для восстановления пароля :</Text>
            <TextInput style={styles.input}
                       placeholder="Введите свой email"
                       value={email}
                       onChangeText={validate}
            />
            {warning ? <Text style={styles.warningText}>Не правильный E-mail</Text> : null}
            <Button title="Отправить" onPress={sendEmail} style={styles.button} disabled={disable}/>
        </View>
    );
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
        marginVertical: 10
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
    warningText: {
        color: 'red'
    },
});

export default EmailForm;