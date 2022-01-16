import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TextInput, View, ScrollView} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {Button, Card} from "react-native-elements";
import moment from "moment";
import {editAd, removeAd} from "../../../store/actions/adsActions";
import CityPicker from "../../ScreenBody/CityPicker";
import {
    categoryTitle,
    cityTitle,
    fullDescriptionLines, localeTime,
    shortDescriptionLines, subCategoryTitle
} from "../../../constants";
import ShowAlert from "../ShowAlert";
import {useNavigation} from "@react-navigation/native";

const UserAdDetails = () => {
    const navigation = useNavigation();
    const ad = useSelector(state => state.ads.modifyingAd);
    const dispatch = useDispatch();

    const [city, setCity] = useState('');
    const [shortDescription, setShortDescription] = useState(ad.shortDescription);
    const [fullDescription, setFullDescription] = useState(ad.fullDescription);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubCategory, setselectedSubCategory] = useState('');

    const [imageUrls, setImageUrls] = useState(ad.imageUrls);
    const [price, setPrice] = useState(ad.price);
    const [phone, setPhone] = useState(ad.phone);
    const [color, setColor] = useState('black');
    const [borderWidth, setBorderWidth] = useState(1);

    useEffect(() => {
        if (ad) {
            // const cityObj = citiesArr.find(el => el.value === ad.city);
            // const category = categoriesArr.find(el => el.catId === ad.selectedCategory);
            // const subCategory = adSubCategory.find(el => el.value === ad.selectedSubCategory);
            setCity(cityTitle(ad.city));
            setSelectedCategory(categoryTitle(ad.selectedCategory));
            setselectedSubCategory(subCategoryTitle(ad.selectedSubCategory))
        }
    },[])

    const setNewImg = (url, ndx) => {
        const copy = imageUrls;
        copy[ndx] = url;
        setImageUrls(copy);
    }

    const addImage = url => {
        const copy = imageUrls;
        copy.push(url);
        setImageUrls(copy);
    }

    const phoneValidation = num => {
        setPhone(num);
    }

    const numbersOnly = (e) => {
        return /^\d+$/.test(e.toString());
    }

    const saveCity = value => {
        setCity(value);
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

    const changeSubmit = async () => {
        if (!shortDescription || !fullDescription || !city || !price || !phone) {
            alert('Ой вы что-то пропустили !')
        }
        const data = {
            id: ad._id,
            shortDescription,
            fullDescription,
            city,
            price,
            phone,
            imageUrls,
        }

        await dispatch(editAd(data));
        navigation.goBack();
    }

    const triggerRemove = async () => {
        await dispatch(removeAd(ad._id));
        navigation.goBack();
    }

    const prompt = () => {
        const alertText = {
            title: 'Внимание !',
            message: "Вы действительно хотите удалить это объявление ?",
            okButtonTitle: () => triggerRemove(),
            okButtonText: "Удалить",
            cancelButtonTitle: "Удаление отменено.",
            cancelButtonText: "Отмена",
            onDismissTitle: "Удаление отменено."

        }
        ShowAlert(alertText);
    }

    return (
        <View>
            <ScrollView styles={styles.container}>
                <Card key={ad._id}>
                    <Card.Title>{ad.adTitle}</Card.Title>
                    <Card.Divider/>
                    <View style={styles.card}>
                        {imageUrls ? imageUrls.map((img, ndx) => <View key={ndx}><Image
                            key={ndx}
                            style={styles.image}
                            resizeMode="cover"
                            source={{uri: img}}
                        /><Text style={styles.text}>Заменить данное изображение</Text>
                            <TextInput
                                style={[styles.textInput, {
                                    borderColor: color,
                                    borderWidth: borderWidth
                                }, {marginTop: 10}]}
                                onChangeText={(txt) => setNewImg(txt, ndx)}
                                placeholder={img}
                            />
                        </View>) : null}
                        <Text style={styles.text}>Добавить еще изображение</Text>
                        <TextInput
                            style={[styles.textInput, {
                                borderColor: color,
                                borderWidth: borderWidth
                            }, {marginTop: 10}]}
                            onChangeText={(txt) => addImage(txt)}
                            placeholder='ссылка на изображение'
                        />
                        <Text
                            style={[styles.name, {color: !ad.moderated ? 'red' : null}, {marginTop: 20}]}>{ad.moderated ? 'Проверено' : 'На модерации'}</Text>
                        <Text style={styles.text}>{localeTime(ad.date)}</Text>
                        <Text style={styles.text}>{selectedCategory}</Text>
                        <Text style={styles.text}>{selectedSubCategory}</Text>
                        <Text style={styles.text}>Выберите город</Text>
                        <CityPicker saveHandler={saveCity} city={city}/>
                        <Text style={styles.text}>Краткое описание</Text>
                        <TextInput
                            style={[styles.textInput, {height: 20 * shortDescriptionLines}]}
                            label='Краткое описание'
                            multiline
                            onChangeText={setShortDescription}
                            value={shortDescription}
                        />
                        <Text style={styles.text}>Полное описание</Text>
                        <TextInput
                            style={[styles.textInput, {height: 20 * fullDescriptionLines}]}
                            multiline
                            onChangeText={setFullDescription}
                            value={fullDescription}
                        />
                        <Text style={styles.text}>Цена</Text>
                        <TextInput
                            style={[styles.textInput, {borderColor: color, borderWidth: borderWidth}]}
                            onChangeText={priceValidation}
                            value={price}
                        />
                        <Text style={styles.text}>Тел.</Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={phoneValidation}
                            value={phone}
                        />
                        <Button
                            containerStyle={styles.text}
                            title="Сохранить"
                            type="outline"
                            onPress={changeSubmit}
                        />
                        <Button
                            title="Удалить объявление"
                            type="outline"
                            onPress={prompt}
                        />
                    </View>
                </Card>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        borderWidth: 1,
        fontSize: 16,
        paddingLeft: 10,
        marginBottom: 15
    },
    image: {
        height: 350,
        width: 350
    },
    text: {
        marginTop: 10,
        marginBottom: 10
    },
    selectContainer: {
        borderWidth: 1,
        marginBottom: 15
    },
    select: {
        padding: 20,
    },
});

export default UserAdDetails;