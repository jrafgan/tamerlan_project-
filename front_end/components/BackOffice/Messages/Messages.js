import React, {useState} from 'react';
import {View, Text, StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {Button} from "react-native-elements";
import {createAd} from "../../../store/actions/adsActions";
import CreateMessageForm from "./CreateMessageForm";

const Messages = () => {

    const [showForm, setShowForm] = useState(false)

    const createMessage = () => {
        console.log('message created');
    }

    const toggleForm = () => {
        console.log('toggle form')
        setShowForm(!showForm);
    }

    return (
        <View>
            <Button
                title={!showForm ? "Написать в поддержку" : "Закрыть"}
                type="solid"
                raised
                onPress={toggleForm}
            />
            {showForm ? <CreateMessageForm/> : null}
            <Text style={styles.headerText}>Все сообщения</Text>
            <View style={styles.messagesContainer}>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerText: {
        fontSize: 18,
        textAlign: 'center',
        textDecorationLine: 'underline',
        marginTop: 20
    },
    messagesContainer: {
        marginHorizontal: 10,
        marginVertical: 20,
        borderWidth: 1,
        minHeight: 20
    }
});

export default Messages;