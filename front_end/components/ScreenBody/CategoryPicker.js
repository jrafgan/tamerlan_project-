import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Button} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import {getCategories, preloaderHandler, setCatIdToStore} from '../../store/actions/adsActions';
import {avitoCatArr} from '../../constants'
import {useDispatch} from "react-redux";
import { Dimensions } from "react-native";

const width = Dimensions.get('window').width;

const Category = () => {
    const dispatch = useDispatch();

    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        if (selectedCategory) {
            dispatch(setCatIdToStore(selectedCategory));
        }
    }, [selectedCategory]);

    const setCategory = catId => {
        dispatch(preloaderHandler(true));
        setSelectedCategory(catId);
    }

    return (
        <View style={styles.containerCategory}>
            <Picker
                style={styles.select}
                selectedValue={selectedCategory}
                onValueChange={catId => setCategory(catId)}>
                <Picker.Item label='Выберите категорию' value=''/>
                {avitoCatArr ? avitoCatArr.map((cat, ndx) => <Picker.Item key={ndx} label={cat.title}
                                                                        value={cat.catId}/>) : null}
            </Picker>
        </View>
    );
}


const styles = StyleSheet.create({
    containerCategory: {
        alignItems: 'center',
        borderWidth: 1,
        height: 40,
        marginTop: 0
    },
    select: {
        width: width,
        padding: 20
    }
});

export default Category;