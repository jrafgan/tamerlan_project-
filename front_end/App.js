import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {ThemeProvider} from "react-native-elements";
import {PersistGate} from 'redux-persist/integration/react';
import createPersistor from './store/configureStore';
import {SafeAreaProvider} from "react-native-safe-area-context";
import Navigation from "./components/Navigation";
const { persistor, store } = createPersistor();

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <SafeAreaProvider>
                    <ThemeProvider>
                        <Navigation />
                    </ThemeProvider>
                </SafeAreaProvider>
            </PersistGate>
        </Provider>
    );
}
