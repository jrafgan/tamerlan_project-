import React, {useState} from 'react';
import {Image, StyleSheet, Text, TextInput, View, ScrollView} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {Button, Card} from "react-native-elements";
import moment from "moment";
import {editAd} from "../../../store/actions/adsActions";
import CityPicker from "../../ScreenBody/CityPicker";
import {fullDescriptionLines, shortDescriptionLines} from "../../../constants";

const UserAdDetails = () => {
    useNavigation();
    const ad = useSelector(state => state.ads.modifyingAd);
    const dispatch = useDispatch();

    const [city, setCity] = useState(ad.city);
    const [shortDescription, setShortDescription] = useState(ad.shortDescription);
    const [fullDescription, setFullDescription] = useState(ad.fullDescription);

    const [imageUrls, setImageUrls] = useState(ad.imageUrls);
    const [price, setPrice] = useState(ad.price);
    const [phone, setPhone] = useState(ad.phone);
    const [color, setColor] = useState('black');
    const [borderWidth, setBorderWidth] = useState(1);

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

    const localeTime = date => {
        return moment(date).local().format('HH:mm DD-MM-YYYY');
    }

    const changeSubmit = () => {
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
        dispatch(editAd(data));
        console.log('changed data : ', data);
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
                        <Text style={styles.text}>{ad.selectedCategory}</Text>
                        <Text style={styles.text}>{ad.selectedSubCategory}</Text>
                        <Text style={styles.text}>Выберите город</Text>
                        <CityPicker saveHandler={saveCity} city={ad.city}/>
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
                        <Text style={styles.text}>Город</Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={setCity}
                            value={city}
                        />
                        <Button
                            title="Сохранить"
                            type="outline"
                            onPress={changeSubmit}
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