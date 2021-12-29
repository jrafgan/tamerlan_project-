import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from "react-native";
import {Picker} from "@react-native-picker/picker";
import {adSubCategory, avitoCatArr, fullDescriptionLines, shortDescriptionLines} from "../../../constants";
import CityPicker from "../../ScreenBody/CityPicker";
import Icon from "react-native-vector-icons/FontAwesome";
import {Button} from "react-native-elements";
import {useDispatch, useSelector} from "react-redux";
import {createAd} from "../../../store/actions/adsActions";

const UserCreateAd = () => {
    const [selectedCategory, setSelectedCategory] = useState('Недвижимость');
    const [selectedSubCategory, setSelectedSubCategory] = useState('Продаю');
    const [city, setCity] = useState('Москва');
    const [adTitle, setAdTitle] = useState('Продам 1-к квартитру');
    const [shortDescription, setShortDescription] = useState('Квартира в центре Москвы');
    const [fullDescription, setFullDescription] = useState('этаж 3, грузовой лифт, площадь 85 м2, газ.');
    const [imageUrlsString, setImageUrlsString] = useState('https://3.bp.blogspot.com/-teROVl8yqB8/V8CQvr5nF-I/AAAAAAACV7M/W59sFtnCXxkXvNPl4CqlMKAhEoieU6nMACLcB/s1600/bizarre-vintage-food-ads-32.jpeg');
    const [imageUrls, setImageUrls] = useState(['https://3.bp.blogspot.com/-teROVl8yqB8/V8CQvr5nF-I/AAAAAAACV7M/W59sFtnCXxkXvNPl4CqlMKAhEoieU6nMACLcB/s1600/bizarre-vintage-food-ads-32.jpeg']);
    const [price, setPrice] = useState(6565656);
    const [phone, setPhone] = useState(5445454);
    const [color, setColor] = useState('black');
    const [borderWidth, setBorderWidth] = useState(1);

    const dispatch = useDispatch();
    // const adToModify = useSelector(state => state.ads.modifyingAd)

    const saveCity = value => {
        setCity(value);
    }

    const numbersOnly = (e) => {
        return /^\d+$/.test(e.toString())
    }

    const priceValidation = (e) => {
        if (numbersOnly(e)) {
            setPrice(parseInt(e));
            if (color === 'red') {
                setColor('black');
                setBorderWidth(1)
            }
        } else {
            setColor('red');
            setBorderWidth(3)
        }
    }

    const formSubmit = () => {
        if (imageUrlsString) {
            setImageUrls([imageUrlsString]);
        }
        if (!selectedCategory || !selectedSubCategory ||  !shortDescription || !fullDescription || !city || !adTitle || !price || !phone) {
            alert('Ой вы что-то пропустили !')
        }
        const data = {
            selectedCategory,
            selectedSubCategory,
            shortDescription,
            fullDescription,
            city,
            adTitle,
            price,
            phone,
            imageUrls,
        }
        dispatch(createAd(data));
    }
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.headerText}>Создать объявление</Text>
            </View>
            <View>
                <CityPicker saveHandler={saveCity}/>
                <View style={styles.selectContainer}>
                    <Picker
                        style={styles.select}
                        selectedValue={selectedCategory}
                        onValueChange={catId => setSelectedCategory(catId)}>
                        <Picker.Item label='Выберите категорию' value=''/>
                        {avitoCatArr ? avitoCatArr.map((cat, ndx) => <Picker.Item key={ndx} label={cat.title}
                                                                                  value={cat.catId}/>) : null}
                    </Picker>
                </View>
                <View style={styles.selectContainer}>
                    <Picker
                        style={styles.select}
                        selectedValue={selectedSubCategory}
                        onValueChange={catId => setSelectedSubCategory(catId)}>
                        <Picker.Item label='Выберите вид объявления' value=''/>
                        {adSubCategory ? adSubCategory.map((cat, ndx) => <Picker.Item key={ndx} label={cat.title}
                                                                                      value={cat.value}/>) : null}
                    </Picker>
                </View>
                <TextInput
                    style={styles.textInput}
                    onChangeText={setAdTitle}
                    placeholder="Заголовок вашего объявления"
                />
                <TextInput
                    style={[styles.textInput, {height: 20 * shortDescriptionLines}]}
                    multiline
                    onChangeText={setShortDescription}
                    placeholder="Краткое описание объявления"
                />
                <TextInput
                    style={[styles.textInput, {height: 20 * fullDescriptionLines}]}
                    multiline
                    onChangeText={setFullDescription}
                    placeholder="Полное описание объявления"
                />
                <TextInput
                    style={[styles.textInput, {height: 20 * shortDescriptionLines}]}
                    multiline
                    onChangeText={setImageUrlsString}
                    placeholder="Ссылка на ваше изображение, каждую ссылку раздаеляйте запятой"
                />
                <TextInput
                    style={[styles.textInput, {borderColor: color, borderWidth: borderWidth}]}
                    onChangeText={priceValidation}
                    placeholder='Ваша цена в рублях'
                />
                <TextInput
                    style={styles.textInput}
                    onChangeText={setPhone}
                    placeholder='Ваш номер тел.'
                />
                <Button
                    icon={
                        <Icon
                            name="plus-square"
                            size={15}
                            color="white"
                        />
                    }
                    onPress={formSubmit}
                    title="Создать"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 50,
        marginTop: 0,
    },
    selectContainer: {
        borderWidth: 1,
        marginBottom: 15
    },
    select: {
        padding: 20,
    },
    textInput: {
        height: 40,
        borderWidth: 1,
        fontSize: 16,
        paddingLeft: 10,
        marginBottom: 15
    },
    headerText: {
        fontSize: 18,
        textAlign: 'center',
        textDecorationLine: 'underline',
        marginBottom: 20
    }
});

export default UserCreateAd;