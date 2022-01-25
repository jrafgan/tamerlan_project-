import React from 'react';
import {Image, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {Button, Card} from "react-native-elements";
import {categoryTitle, cityTitle, fullDescriptionLines, localeTime, subCategoryTitle} from "../../constants";
import CreateMessageForm from "../BackOffice/Messages/CreateMessageForm";
import {useSelector} from "react-redux";

const GuestAdDetails = () => {
    const ad = useSelector(state => state.ads.modifyingAd)

    return (
        <View>
            <ScrollView styles={styles.container}>
                {ad ? <Card key={ad._id}>
                    <Card.Title>{ad.adTitle}</Card.Title>
                    <Card.Divider/>
                    <View style={styles.card}>
                        {ad.imageUrls ? ad.imageUrls.map((img, ndx) => <View key={ndx}><Image
                            key={ndx}
                            style={styles.image}
                            resizeMode="cover"
                            source={{uri: img}}
                        />
                        </View>) : null}
                        <Text style={styles.text}>{localeTime(ad.date)}</Text>
                        <Text style={styles.text}>{categoryTitle(ad.selectedCategory)}</Text>
                        <Text style={styles.text}>{subCategoryTitle(ad.selectedSubCategory)}</Text>
                        <Text style={styles.text}>г. {cityTitle(ad.city)}</Text>
                        <Text style={styles.text}>{ad.shortDescription}</Text>
                        <TextInput
                            style={[styles.textInput, {minHeight: 20 * fullDescriptionLines}]}
                            multiline
                            editable={false}
                            value={ad.fullDescription}
                        />
                        <Text style={styles.text}>Цена : {ad.price}</Text>
                        <Text style={styles.text}>Телефон : {ad.phone}</Text>

                    </View>
                </Card> : <Text style={styles.headerText}>Вы не выбрали</Text>}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        height: 350,
        width: 300
    },
    text: {
        marginTop: 10,
        marginBottom: 10
    },
    headerText: {
        fontSize: 18,
        textAlign: 'center',
        textDecorationLine: 'underline',
        marginBottom: 20
    },
    textInput: {
        borderWidth: 1,
        fontSize: 16,
        paddingLeft: 10,
        marginBottom: 15,
        color: '#000'
    },
});

export default GuestAdDetails;