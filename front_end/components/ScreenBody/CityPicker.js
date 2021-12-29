import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TextInput, Text, TouchableOpacity} from 'react-native';
import {citiesArr} from '../../constants';
import { Dimensions } from "react-native";
import {useSelector} from "react-redux";
import {setCityToStore} from "../../store/actions/adsActions";

const width = Dimensions.get('window').width;

const CityPicker = ({saveHandler, city}) => {

    const [text, setText] = useState(city);
    const [filteredCities, setFilteredCities] = useState([]);
    const clientLocation = useSelector(state => state.ads.location)

    const findSuggestion = (query) => {
        if (query) {
            const regex = new RegExp(`${'^' + query.trim()}`, 'i');
            setFilteredCities(citiesArr.filter(city => city.title.search(regex) >= 0))

        } else {
            setFilteredCities([]);
        }
    };

    const saveCity = city => {
        saveHandler(city.value);
        dispatch(setCityToStore(city.value));
        setText(city.title);
        setFilteredCities([])
    }

    return (
        <View style={styles.containerCategory}>
            <Text>{clientLocation}</Text>
            <TextInput
                style={styles.input}
                onChangeText={query => {
                    findSuggestion(query);
                    return setText(query);
                }}
                //placeholder='Выберите город...'
                value={text}
            />
            <View style={styles.suggestList}>
                {filteredCities.length > 0 ? filteredCities.map((city, ndx) => <TouchableOpacity key={ndx}
                                                                                                 onPress={() => {
                                                                                                     saveCity(city);
                                                                                                 }}>
                    <View style={styles.list}>
                        <Text style={styles.listText}>{city.title}</Text>
                    </View>
                </TouchableOpacity>) : null}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    containerCategory: {},
    input: {
        height: 40,
        borderWidth: 1,
        paddingHorizontal: 10,
        width: width,
        fontSize: 16,
        marginBottom: 15
    },
    suggestList: {
        position: 'absolute',
        bottom: 50,
        left: 0,
        backgroundColor: '#fff'
    },
    list: {
        borderBottomWidth: 1,
        padding: 3
    },
    listText: {
        fontSize: 20,
    }
});

export default CityPicker;