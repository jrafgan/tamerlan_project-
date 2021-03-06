import React from 'react';
import {
    StyleSheet, View, Text, Image, TouchableOpacity, Dimensions,
} from 'react-native';
import Carousel, { PaginationLight } from 'react-native-x-carousel';
import {setAdToModify} from "../store/actions/adsActions";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";

const { width } = Dimensions.get('window');

const DATA = [
    {
        coverImageUri: 'https://user-images.githubusercontent.com/6414178/73920321-2357b680-4900-11ea-89d5-2e8cbecec9f6.jpg',
        cornerLabelColor: '#FFD300',
        cornerLabelText: 'Здесь может ',
    },
    {
        coverImageUri: 'https://user-images.githubusercontent.com/6414178/73920358-336f9600-4900-11ea-8eec-cc919b991e90.jpg',
        cornerLabelColor: '#0080ff',
        cornerLabelText: 'быть ваша',
    },
    {
        coverImageUri: 'https://user-images.githubusercontent.com/6414178/73927874-25744200-490d-11ea-940f-db3e5dbd8b2b.jpg',
        cornerLabelColor: '#2ECC40',
        cornerLabelText: 'реклама. Вашего',
    },
    {
        coverImageUri: 'https://user-images.githubusercontent.com/6414178/73920399-45e9cf80-4900-11ea-9d5b-743fe5e8b9a4.jpg',
        cornerLabelColor: '#2ECC40',
        cornerLabelText: 'прибыльного бизнеса.',
    },
    {
        coverImageUri: "https://3.bp.blogspot.com/-teROVl8yqB8/V8CQvr5nF-I/AAAAAAACV7M/W59sFtnCXxkXvNPl4CqlMKAhEoieU6nMACLcB/s1600/bizarre-vintage-food-ads-32.jpeg",
        cornerLabelColor: '#2ECC40',
        cornerLabelText: 'Продам 1-к квартитру',
    },
];

const AppAdsBlock = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const paid = useSelector(state => state.ads.paidAds);

    const goToDetails = async ad => {
        if (ad._id) {
            await dispatch(setAdToModify(ad));
            navigation.navigate('GuestAdDetails');
        } else {
            console.log('it is mockup ad : ', ad);
        }
    }

    const renderItem = data => (
        <View
            key={data._id && data.imageUrls[0] ? data.imageUrls[0] : data.coverImageUri}
            style={styles.cardContainer}
        >
            <View
                style={styles.cardWrapper}
            >
                <TouchableOpacity onPress={() => goToDetails(data)}>
                <Image
                    style={styles.card}
                    source={{ uri: data._id && data.imageUrls[0] ? data.imageUrls[0] : data.coverImageUri }}
                />
                </TouchableOpacity>
                <View
                    style={styles.cornerLabel}
                >
                    <Text style={styles.cornerLabelText}>
                        { data._id && data.adTitle ? data.adTitle : data.cornerLabelText }
                    </Text>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Carousel
                pagination={PaginationLight}
                renderItem={renderItem}
                data={paid || DATA}
                loop
                autoplay
                autoplayInterval={3000}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 5

    },
    cardContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width,
    },
    cardWrapper: {
        borderRadius: 8,
        //overflow: 'hidden',
    },
    card: {
        width: width * 0.9,
        height: width * 0.9,
    },
    cornerLabel: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderTopLeftRadius: 8,
    },
    cornerLabelText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '600',
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 2,
        paddingBottom: 2,
        backgroundColor: "#FFD300"
    },
});

export default AppAdsBlock;
