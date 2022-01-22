import React from 'react';
import {Button, StyleSheet, Text, TextInput, View} from "react-native";
import {useDispatch} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {checkEmail, setNewPassword} from "../../store/actions/usersActions";

const ChangePasswordForm = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [oldPass, setOldPass] = React.useState('');
    const [warning1, setWarning1] = React.useState(false);
    const [warning2, setWarning2] = React.useState(false);
    const [disable, setDisable] = React.useState(true);
    const [newPass, setNewPass] = React.useState('');
    const [confNewPass, setConfNewPass] = React.useState('');

    const sendNewPassword = async () => {
        if (oldPass && newPass) {
            const data = {
                oldPass,
                newPass
            }
            await dispatch(setNewPassword(data));
        }
    }

    const validateNewPass = (text) => {
        setNewPass(text);
        if (text.length < 6) {
            setWarning1(true);
        } else {
            setWarning1(false);
        }
    }

    const confirmNewPass = (text) => {
        setConfNewPass(text)
        if (newPass !== text) {
            setWarning2(true);
        } else {
            setWarning2(false);
            setDisable(false);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Для смены пароля :</Text>
            <TextInput style={styles.input}
                       placeholder="Введите старый пароль"
                       value={oldPass} //todo delete
                       secureTextEntry
                       onChangeText={setOldPass}
            />
            <Text style={styles.text}>Придумайте новую пароль :</Text>
            <TextInput style={styles.input}
                       placeholder="Введите новый пароль"
                       value={newPass}
                       secureTextEntry
                       onChangeText={validateNewPass}
            />
            {warning1 ? <Text style={styles.warningText}>Не короче 6 символов</Text> : null}
            <Text style={styles.text}>Введите еще раз :</Text>
            <TextInput style={styles.input}
                       placeholder="Повторите новый пароль"
                       value={confNewPass}
                       secureTextEntry
                       onChangeText={confirmNewPass}
            />
            {warning2 ? <Text style={styles.warningText}>Пароли не совпадают</Text> : null}
            <Button title="Сохранить" onPress={sendNewPassword} style={styles.button} disabled={disable}/>
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

export default ChangePasswordForm;