import React, {useEffect} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import Messages from "../Messages/Messages";

const AdminMessages = () => {

    return (
        <View>
            <ScrollView styles={styles.container}>
                <Messages/>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        height: 350,
        width: 300
    },
    text: {
        marginTop: 10,
        marginBottom: 10
    },
    btn: {
        marginVertical: 20,
    },
    headerText: {
        fontSize: 18,
        textAlign: 'center',
        textDecorationLine: 'underline',
        marginBottom: 20
    },
});

export default AdminMessages;