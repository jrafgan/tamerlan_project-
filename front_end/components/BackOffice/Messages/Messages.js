import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {Button} from "react-native-elements";
import CreateMessageForm from "./CreateMessageForm";
import {ListItem, Icon} from 'react-native-elements'
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {markMsgAsRead, setMsgToReply} from "../../../store/actions/messagesActions";

const Messages = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [showForm, setShowForm] = useState(false);
    const messages = useSelector(state => state.messages);
    const admin = useSelector(state => state.users.user);

    const showDetails = data => {
        navigation.navigate('MessageDetails');
        dispatch(setMsgToReply(data));
        if (data.newMsg === true) {
            dispatch(markMsgAsRead(data._id));
        }
    }

    return (
        <View>
            {admin && admin !== 'admiN01' ? <View>
                <Button
                    title={!showForm ? "Написать в поддержку" : "Закрыть"}
                    type="solid"
                    raised
                    onPress={() => setShowForm(!showForm)}
                />
                {showForm ? <CreateMessageForm/> : null}
            </View> : null}
            <Text style={styles.headerText}>Все сообщения</Text>
            <View style={styles.messagesContainer}>
                {messages.allMessages.length > 0 ? messages.allMessages.map((item, i) => (
                    <TouchableOpacity onPress={() => showDetails(item)} key={i}>
                        <ListItem bottomDivider>
                            <ListItem.Content >
                                <ListItem.Title>{item.title}</ListItem.Title>
                            </ListItem.Content>
                            {item.newMsg ? <Icon name='mail'/> : null}
                            <ListItem.Chevron/>
                        </ListItem>
                    </TouchableOpacity>
                )) : null}
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
    },
    bgColor: {
        backgroundColor: 'rgba(244, 67, 54, 0.6)'
    }
});

export default Messages;