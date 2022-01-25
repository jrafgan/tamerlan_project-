import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import {Button, Card} from "react-native-elements";
import moment from "moment";
import {useSelector} from "react-redux";
import CreateMessageForm from "./CreateMessageForm";
import {localeTime} from "../../../constants";

const MessageDetails = () => {

    const message = useSelector(state => state.messages.msgToReply);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {// todo delete this
        console.log('msg to reply: ', message);
    }, [])

    // const replyTo = () => {
    //     setShowForm(!showForm);
    // }

    return (
        <View>
            {message && message ? <Card key={message._id}>
                <Card.Title>Тема : {message.title}</Card.Title>
                <Card.Divider/>
                <View style={styles.card}>
                    {message.imageUrls ? message.imageUrls.map((img, ndx) => <Image
                        key={ndx}
                        style={styles.image}
                        resizeMode="cover"
                        source={{uri: img}}
                    />) : null}
                    <Text style={styles.name}>От : {message.fromUsername === 'admiN01' ? ' Админ' : message.fromUsername}</Text>
                    <Text style={styles.name}>{localeTime(message.date)}</Text>
                    <Text style={styles.name}>{message.description}</Text>
                    <Button
                        title={!showForm ? "Ответить" : "Закрыть"}
                        type="outline"
                        onPress={() => setShowForm(!showForm)}
                    />
                </View>
            </Card> : null}
            {showForm ? <CreateMessageForm /> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    headerText: {
        fontSize: 18,
        textAlign: 'center',
        textDecorationLine: 'underline',
        marginBottom: 20
    },
    image: {
        height: 350,
        width: 350
    }
});

export default MessageDetails;
