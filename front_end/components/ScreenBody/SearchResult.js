import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import WebView from "react-native-webview";
import {avitoURL, citiesArr, youlaURL} from "../../constants";
import {preloaderHandler, setCityToStore} from "../../store/actions/adsActions";

const width = Dimensions.get('window').width;

const SearchResult = () => {
    const dispatch = useDispatch();
    const adsState = useSelector(state => state.ads);

    const [youlaUrl2, setYoulaUrl2] = useState('');
    const [avitoUrl2, setAvitoUrl2] = useState('');
    const [autoUrl, setAutoUrl] = useState('');
    const [autoPartsUrl, setAutoPartsUrl] = useState('');
    const [hhUrl, setHhUrl] = useState('');

    const [autoHeight, setAutoHeight] = useState(30);
    const [youlaHeight, setYoulaHeight] = useState(30);
    const [avitoHeight, setAvitoHeight] = useState(30);
    const [hhHeight, setHHHeight] = useState(30);

    const [keyWord, setKeyWord] = useState('');
    const [categories, setCategories] = useState([]);
    const [localCity, setLocalCity] = useState('');

    let catId = adsState.catId;
    let city = adsState.city || localCity || 'moskva';
    let location = adsState.location;

    const resetWebview = () => {
        setAutoUrl('');
        setAutoPartsUrl('');
        setYoulaUrl2('');
        setAvitoUrl2('');
        setHhUrl('');
    }

    const findCity = () => {
        const found = citiesArr.find(el => el.title === location);
        if (found) {
            setLocalCity(found.value);
        }
    }

    useEffect(() => {
        resetWebview();
        if (catId) {
            if (autoHeight > 30 || youlaHeight > 30 || avitoHeight > 30 || hhHeight > 30) {
                dispatch(preloaderHandler(false));
            }

            switch (catId) {
                case 'id0': // транспорт
                    setAutoUrl('https://m.auto.ru/cars/all/');
                    if (keyWord) {
                        setUrlToAvito(`${avitoURL}/${city}/transport?q=${keyWord}`);
                        setUrlToYoula(`${youlaURL}/${city}/spetstehnika-moto?q=${keyWord}`);
                    }
                    return;
                case 'id1': // авомобили
                    setAutoUrl('https://m.auto.ru/');
                    if (keyWord) {
                        setUrlToAvito(`${avitoURL}/${city}/avtomobili?q=${keyWord}`);
                        setUrlToYoula(`${youlaURL}/${city}/auto?q=${keyWord}`);
                    }
                    return;
                case 'id7': // Запчасти и аксессуары
                    setAutoPartsUrl('https://parts.auto.ru/');
                    if (keyWord) {
                        setUrlToAvito(`${avitoURL}/${city}/zapchasti_i_aksessuary?q=${keyWord}`);
                        setUrlToYoula(`${youlaURL}/${city}/avto-moto?q=${keyWord}`);
                    }
                    return;
                case 'id2': // Недвижимость
                    setAvitoUrl2(`${avitoURL}/${city}/nedvizhimost`);
                    if (keyWord) {
                        setUrlToYoula(`${youlaURL}/${city}/nedvijimost?q=${keyWord}`);
                    }
                    return;
                case 'id3': // Работа
                    setHhUrl(`https://hh.ru/`);
                    if (keyWord) {
                        setUrlToAvito(`${avitoURL}/${city}/rabota?q=${keyWord}`);
                        setUrlToYoula(`${youlaURL}/${city}/rabota?q=${keyWord}`)
                    }
                    return;
                case 'id4': // Предложения услуг
                    console.log('in case : ', catId, keyWord);
                    setAvitoUrl2(`${avitoURL}/${city}/predlozheniya_uslug`);
                    if (keyWord) {
                        setUrlToYoula(`${youlaURL}/${city}/uslugi?q=${keyWord}`);
                    }
                    return;
                case 'id5': // Животные
                    console.log('in case : ', catId, keyWord);
                    setAvitoUrl2(`${avitoURL}/${city}/zhivotnye`);
                    if (keyWord) {
                        setUrlToYoula(`${youlaURL}/${city}/zhivotnye?q=${keyWord}`);
                    }
                    return;
                case 'id6': // Готовый бизнес и оборудование
                    setAvitoUrl2(`${avitoURL}/${city}/dlya_biznesa`);
                    if (keyWord) {
                        setUrlToYoula(`${youlaURL}/${city}/dlya-biznesa?q=${keyWord}`);
                    }
                    return;
                case 'id8': // Прочее
                    setAvitoUrl2(`${avitoURL}/${city}`);
                    if (keyWord) {
                        setUrlToYoula(`${youlaURL}/${city}/prochee?q=${keyWord}`);
                    }
                    return;

                default:
                    return;
            }
        } return () => {
            resetWebview();
            setKeyWord('');
        }
    }, [youlaUrl2, avitoUrl2, autoUrl, hhUrl, autoPartsUrl, catId, keyWord]);

    const setUrlToYoula = url => {
        setYoulaUrl2(url);
        console.log('this is keyword for youla ', keyWord);
    }

    const setUrlToAvito = url => {
        setAvitoUrl2(url);
        console.log('this is keyword for avito ', keyWord);
    }

    const jsWebviewHeightCode = `
        const height = document.documentElement.scrollHeight;
        window.ReactNativeWebView.postMessage(height);
    `;

    const jsAvitoCode = `
        const height = document.documentElement.scrollHeight;
        window.ReactNativeWebView.postMessage(height);
        
        const searchValue = document.querySelector('div._1DzEv > input').getAttribute('value');
        const searchValue2 = document.querySelector('h1._3NU92').innerHTML;
 
        if (searchValue) {
            window.ReactNativeWebView.postMessage(searchValue);
        } else if (!searchValue2 && searchValue2) {
            window.ReactNativeWebView.postMessage(searchValue2);
        }`;

    const jsAutoCode = `
        const height = document.documentElement.scrollHeight;
        window.ReactNativeWebView.postMessage(height);
        const adTitle = document.querySelector('.PseudoInputGroup__title').innerHTML;
        const adSubtitle = document.querySelector('.PseudoInputGroup__subtitle').innerHTML;
        
        let keyWord = adTitle + ' ' + adSubtitle;
        if (keyWord) {
            window.ReactNativeWebView.postMessage(keyWord);
        }`;

    const jsAutoPartsCode = `
        const height = document.documentElement.scrollHeight;
        window.ReactNativeWebView.postMessage(height);
        
        const searchValue = document.querySelector('.TextInput__control').getAttribute('value');
        
        if (searchValue) {
            window.ReactNativeWebView.postMessage(searchValue);
        }`;

    const jsHHCode = `
        const height = document.documentElement.scrollHeight;
        window.ReactNativeWebView.postMessage(height);
        
        let el = document.querySelector('.bloko-input');
        if (el) {
            const value = el.getAttribute('value');
            window.ReactNativeWebView.postMessage(value);
        }`;

    return (

        catId ? <View style={styles.container}>
            <Text style={styles.text1}> Введите то, что ищете : </Text>
            {autoUrl ? <View><Text style={styles.titleText}>Auto.ru :</Text><WebView
                style={{
                    width: '100%',
                    marginTop: 20,
                    height: autoHeight
                }}
                injectedJavaScript={jsAutoCode}
                source={{uri: autoUrl}}
                onMessage={event => {
                    const data = event.nativeEvent.data;
                    let number = Number(data);
                    if (number) {
                        setAutoHeight(number);
                        dispatch(preloaderHandler(false));
                    }
                    if (!number && data) {
                        setKeyWord(data);
                    }
                    console.log('auto.ru data : ', data);
                }}
                javaScriptEnabled
            /></View> : null}

            {autoPartsUrl ? <View><Text style={styles.titleText}>Auto.ru :</Text><WebView
                style={{
                    width: '100%',
                    marginTop: 20,
                    height: autoHeight
                }}
                injectedJavaScript={jsAutoPartsCode}
                source={{uri: autoPartsUrl}}
                onMessage={event => {
                    const data = event.nativeEvent.data;
                    let number = Number(data);
                    if (number) {
                        setAutoHeight(number);
                        dispatch(preloaderHandler(false));
                    }
                    if (!number && data) {
                        setKeyWord(data);
                    }
                    console.log('parts.auto.ru data : ', data);
                }}
                javaScriptEnabled
            /></View> : null}

            {hhUrl ? <View><Text style={styles.titleText}>Hh.ru :</Text><WebView
                style={{
                    width: '100%',
                    marginTop: 20,
                    height: hhHeight
                }}
                injectedJavaScript={jsHHCode}
                source={{uri: hhUrl}}
                onMessage={event => {
                    const data = event.nativeEvent.data;
                    let number = Number(data);
                    if (number) {
                        setHHHeight(number);
                        dispatch(preloaderHandler(false));
                    }
                    if (!number && data) {
                        setKeyWord(data);
                    }
                    console.log('HH data ', data);
                }}
                javaScriptEnabled
            /></View> : null}

            {avitoUrl2 ? <View><Text style={styles.titleText}>Avito.ru :</Text><WebView
                style={{
                    width: '100%',
                    marginTop: 20,
                    height: avitoHeight
                }}
                injectedJavaScript={jsAvitoCode}
                source={{uri: avitoUrl2}}
                onMessage={event => {
                    const data = event.nativeEvent.data;
                    let number = Number(data);
                    if (number) {
                        setAvitoHeight(number);
                        dispatch(preloaderHandler(false));
                    }
                    if (!number && data) {
                        setKeyWord(data);
                    }
                    console.log('Avito data ', data);
                }}
                javaScriptEnabled
            /></View> : null}

            {youlaUrl2 ? <View><Text style={styles.titleText}>Youla.ru :</Text><WebView
                style={{
                    width: '100%',
                    marginTop: 20,
                    height: youlaHeight
                }}
                injectedJavaScript={jsWebviewHeightCode}
                source={{uri: youlaUrl2}}
                onMessage={event => {
                    const data = event.nativeEvent.data;
                    let number = Number(data);
                    if (number) setYoulaHeight(number);
                    dispatch(preloaderHandler(false));
                    console.log('Youla data ', data);
                }}
                javaScriptEnabled
            /></View> : null}
        </View> : null
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10
    },
    titleText: {
        fontSize: 20,
        marginTop: 20,
    },
    text1: {
        fontSize: 20,
        paddingBottom: 10,
        color: '#000'
    }
});

export default SearchResult;