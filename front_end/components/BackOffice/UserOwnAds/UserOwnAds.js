import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {Card, Button} from 'react-native-elements';
import moment from 'moment';
import {setAdToModify} from "../../../store/actions/adsActions";
import {useNavigation} from "@react-navigation/native";
import {localeTime, subCategoryTitle} from "../../../constants";

const UserOwnAds = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const allAds = useSelector(state => state.ads.allAds);
    const [ads, setAds] = useState([]);

    const showDetails = async ad => {
        await dispatch(setAdToModify(ad));
        navigation.navigate('UserAdDetails');
    }

    return (
        <View>
            <View><Text style={styles.headerText}>Мои объявления</Text></View>
            {allAds && allAds.length > 0 ? allAds.map((ad) => <Card key={ad._id}>
                <Card.Title>{ad.adTitle}</Card.Title>
                <Card.Divider/>
                <View style={styles.card}>
                    <Image
                        style={styles.image}
                        resizeMode="cover"
                        source={{uri: ad.imageUrls[0]}}
                    />
                    <Text style={styles.name}>{localeTime(ad.date)}</Text>
                    <Text style={styles.name}>{subCategoryTitle(ad.selectedSubCategory)}</Text>
                    <Text
                        style={[styles.name, {color: !ad.moderated ? 'red' : null}]}>{ad.moderated ? 'Проверено' : 'На модерации'}</Text>
                    <Text style={styles.name}>{ad.shortDescription}</Text>
                    <Text style={styles.name}>Цена: {ad.price}</Text>
                    <Button
                        title="Подробнее"
                        type="outline"
                        onPress={() => showDetails(ad)}
                    />
                </View>
            </Card>) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    headerText: {
        fontSize: 18,
        textAlign: 'center',
        textDecorationLine: 'underline',
        marginBottom: 20
    },
    image: {
        height: 350,
        width: 350
    }
});

export default UserOwnAds;