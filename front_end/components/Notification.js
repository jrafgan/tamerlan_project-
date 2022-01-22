import React from 'react';
import {StyleSheet, View, Text} from "react-native";

const Notification = message => {
    return (
        <View style={[styles.badge, {backgroundColor: message.color}]}>
            <Text style={styles.badgeText}>{message.message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    badge: {
        padding: 20,
        borderRadius: 10
    },
    badgeText: {
        fontSize: 24,
    }
});

export default Notification;