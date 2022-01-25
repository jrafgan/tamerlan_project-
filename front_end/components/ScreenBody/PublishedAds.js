import React, {useState} from 'react';
import {View, Text, Image, StyleSheet} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {Button, Card} from "react-native-elements";
import {localeTime, subCategoryTitle} from "../../constants";
import {setAdToModify} from "../../store/actions/adsActions";
import {useNavigation} from "@react-navigation/native";

const PublishedAds = () => {
    const dispatch = useDispatch();
    const ads = useSelector(state => state.ads.publishedAds)
    const navigation = useNavigation();
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(20);
    const [advs, setAdvs] = useState([]);

    const showDetails = async ad => {
        await dispatch(setAdToModify(ad));
        navigation.navigate('GuestAdDetails');
    }

    const showMore = () => {
        console.log('per page, show more : ', page);
        setPage(page + 1);
        const end = page * perPage;
        const result = ads.slice(0, end);
        setAdvs(result);
        console.log('per page, show more : ', page);
    }

    const showLess = () => {
        if (page > 1) {
            console.log('per page, show less : ', page);
            setPage(page - 1);
            const end = page * perPage;
            const result = ads.slice(0, end);
            setAdvs(result);
            console.log('per page, show less : ', page);
        }
    }

    return (
        <View>
            {ads && ads.length > 0 ? ads.map((ad) => <Card key={ad._id}>
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

                    <Text style={styles.name}>{ad.shortDescription}</Text>
                    <Text style={styles.name}>Цена: {ad.price}</Text>
                    <Button
                        title="Подробнее"
                        type="outline"
                        onPress={() => showDetails(ad)}
                    />
                </View>
            </Card>) : null}
            <View style={styles.flexButtons}>
                <Button
                    title="Показать больше"
                    type="outline"
                    onPress={showMore}
                />
                <Button
                    title="Показать меньше"
                    type="outline"
                    onPress={showLess}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    flexButtons: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    image: {
        height: 350,
        width: 350
    }
});

export default PublishedAds;