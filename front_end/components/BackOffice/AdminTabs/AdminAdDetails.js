import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View, ScrollView} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {Button, Card} from "react-native-elements";
import moment from "moment";
import {editAd} from "../../../store/actions/adsActions";
import {categoryTitle, citiesArr, cityTitle, localeTime, subCategoryTitle} from "../../../constants";

const AdminAdDetails = () => {
    useNavigation();
    const selectedAd = useSelector(state => state.ads.modifyingAd);
    const dispatch = useDispatch();

    const [city, setCity] = useState('');
    const [approve, setApprove] = useState(selectedAd.moderated);

    useEffect(() => {
        // if (selectedAd) {
        //     citiesArr.find(el => {
        //         if (el.value === selectedAd.city) {
        //             setCity(el.title);
        //         }
        //         return el.value === selectedAd.city;
        //     });
        // }
        // if (selectedAd.moderated) {
        //     setCity(selectedAd.moderated)
        // }
    }, []);

    const changeStatus = () => {
        setApprove(!approve);
    }

    const changeSubmit = () => {
        const data = {
            id: selectedAd._id,
            moderated: approve,
        }
        dispatch(editAd(data));
        console.log('changed data : ', data);
    }

    const createMsg = () => {

    }

    return (
        <View>
            <ScrollView styles={styles.container}>
                {selectedAd ? <Card key={selectedAd._id}>
                    <Card.Title>{selectedAd.adTitle}</Card.Title>
                    <Card.Divider/>
                    <View style={styles.card}>
                        {selectedAd.imageUrls ? selectedAd.imageUrls.map((img, ndx) => <View key={ndx}><Image
                            key={ndx}
                            style={styles.image}
                            resizeMode="cover"
                            source={{uri: img}}
                        />
                        </View>) : null}
                        <View style={styles.text}>
                            <Button
                                raised
                                title={approve ? 'Проверено' : 'На модерации'}
                                type="outline"
                                onPress={changeStatus}
                                titleStyle={{color: approve ? 'rgba(78, 116, 289, 1)' : 'red',}}
                            />
                        </View>
                        <Text
                            style={[styles.name, {color: !approve ? 'red' : null}, {marginTop: 20}]}>{approve ? 'Проверено' : 'На модерации'}</Text>
                        <Text style={styles.text}>{localeTime(selectedAd.date)}</Text>
                        <Text style={styles.text}>{categoryTitle(selectedAd.selectedCategory)}</Text>
                        <Text style={styles.text}>{subCategoryTitle(selectedAd.selectedSubCategory)}</Text>
                        <Text style={styles.text}>г. {cityTitle(selectedAd.city)}</Text>
                        <Text style={styles.text}>{selectedAd.shortDescription}</Text>
                        <Text style={styles.text}>{selectedAd.fullDescription}</Text>
                        <Text style={styles.text}>{selectedAd.price}</Text>
                        <Text style={styles.text}>{selectedAd.phone}</Text>
                        <Button
                            containerStyle={styles.btn}
                            raised
                            title="Сохранить"
                            type="outline"
                            onPress={changeSubmit}
                        />
                        <Button
                            raised
                            title="Написать сообщение..."
                            type="outline"
                            onPress={createMsg}
                        />
                    </View>
                </Card> : <Text style={styles.headerText}>Вы не выбрали</Text>}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        height: 350,
        width: 350
    },
    text: {
        marginTop: 10,
        marginBottom: 10
    },
    btn: {
        marginVertical: 20,
    },
    headerText: {
        fontSize: 18,
        textAlign: 'center',
        textDecorationLine: 'underline',
        marginBottom: 20
    },
});

export default AdminAdDetails;