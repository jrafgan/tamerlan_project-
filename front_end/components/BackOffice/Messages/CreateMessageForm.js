import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from "react-native";
import {createAd} from "../../../store/actions/adsActions";
import {Button} from "react-native-elements";

const CreateMessageForm = () => {

    const [imageUrlsString, setImageUrlsString] = useState('');
    const [imageUrls, setImageUrls] = useState(['']);
    const [title, setTitle] = useState('Продам 1-к квартитру');
    const [description, setDescription] = useState('Квартира в центре Москвы');

    const sendMessage = () => {
        if (imageUrlsString) {
            setImageUrls([imageUrlsString]);
        }
        if ( !description || !title) {
            alert('Ой вы что-то пропустили !')
        }
        const data = {
            description,
            title,
            imageUrls,
        }
        console.log('message sending', data);
    }

    return (
        <View style={styles.form}>
            <TextInput
                style={styles.textInput}
                onChangeText={setTitle}
                placeholder="Тема"
            />
            <TextInput
                style={[styles.textInput, {height: 100}]}
                multiline
                onChangeText={setDescription}
                placeholder="Сообщение"
            />
            <TextInput
                style={styles.textInput}
                multiline
                onChangeText={setImageUrlsString}
                placeholder="Ссылка на ваш  скриншот, каждую ссылку раздаеляйте запятой"
            />
            <Button
                title={"Отправить"}
                type="solid"
                raised
                onPress={sendMessage}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        borderWidth: 1,
        fontSize: 16,
        paddingLeft: 10,
        marginBottom: 15
    },
    form: {
        marginHorizontal: 10,
        marginVertical: 20

    }
});

export default CreateMessageForm;