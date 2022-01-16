import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput, View} from "react-native";
import {sendMessage} from "../../../store/actions/messagesActions";
import {Button} from "react-native-elements";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";

const CreateMessageForm = () => {

    const [imageUrlsString, setImageUrlsString] = useState('');
    const [imageUrls, setImageUrls] = useState([]);
    const [title, setTitle] = useState('Продам 1-к квартитру');
    const [description, setDescription] = useState('Квартира в центре Москвы');
    const userData = useSelector(state => state.users);
    const ad = useSelector(state => state.ads.modifyingAd);
    const message = useSelector(state => state.messages.msgToReply);
    const dispatch = useDispatch();

    const localeTime = date => {
        return moment(date).local().format('HH:mm DD-MM-YYYY');
    }

    useEffect(() => {
        if (message) {
            setTitle('Re : ' + message.title);
            setDescription('\n' + '\n' + 'От : ' + (message.fromUsername === 'admiN01' ? ' Админ' : message.fromUsername) + '\n' + localeTime(message.date) + '\n' +  message.description);
        }
    }, [])

    const sendMsg = () => {
        if (imageUrlsString) {
            setImageUrls([imageUrlsString]);
        }
        if (!description || !title) {
            alert('Ой вы что-то пропустили !')
        }

        let data = {
            fromUserId: userData.userId,
            fromUsername: userData.user && userData.user === 'admiN01' ? 'admiN01' : userData.user,
            newMsg: true,
            description,
            title,
            imageUrls,
        };

        if (message) {
                data.toUser = message.fromUserId;
        } else {
                data.toUser = ad ? ad.user_id : 'admiN01';
        }
        dispatch(sendMessage(data));
    }

    return (
        <View style={styles.form}>
            <TextInput
                style={styles.textInput}
                onChangeText={setTitle}
                placeholder="Тема"
                value={title}
            />
            <TextInput
                style={[styles.textInput, {height: 100}]}
                multiline
                onChangeText={setDescription}
                placeholder="Сообщение"
                value={description}
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
                onPress={sendMsg}
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