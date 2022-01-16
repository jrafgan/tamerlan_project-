import React, {useEffect} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import Messages from "../Messages/Messages";

const AdminMessages = () => {

    useEffect(() => {//todo delete
        // if (selectedAd) {
        //     citiesArr.find(el => {
        //         if (el.value === selectedAd.city) {
        //             setCity(el.title);
        //         }
        //         return el.value === selectedAd.city;
        //     });
        // }
        // if (selectedAd.moderated) {
        //     setCity(selectedAd.moderated)
        // }
    }, []);
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
        width: 350
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