import React from "react";
import { Alert } from "react-native";

const ShowAlert = (data) => {


    const trigger = () => {
        data.okButtonTitle();
        console.log('trigger started : ')
    }

    return Alert.alert(
        data.title,
        data.message,
        [
            {
                text: data.cancelButtonText,
                onPress: () => Alert.alert(data.cancelButtonTitle),
                style: "cancel",
            },
            {
                text: data.okButtonText,
                onPress: data.okButtonTitle,
                style: "destructive",
            },

        ],
        {
            cancelable: true,
            onDismiss: () =>
                Alert.alert(
                    data.onDismissTitle
                ),
        }
    );
}

export default ShowAlert;
