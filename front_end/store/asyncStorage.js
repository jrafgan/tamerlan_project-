import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToAsyncStorage = async data => {
    try {
        const serializedState = JSON.stringify(data);
        return await AsyncStorage.setItem('userData', serializedState);
    } catch (e) {
        console.log(e);
    }
};

export const loadFromAsyncStorage = async () => {
    try {
        let result = await AsyncStorage.getItem('userData');
        return JSON.parse(result);
    } catch (e) {
        console.log(e);
    }
};

export const clearAsyncStorage = async () => {
    try {
        return await AsyncStorage.removeItem('userData');
    } catch (e) {
        console.log(e);
    }
};