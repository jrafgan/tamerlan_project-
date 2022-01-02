import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions,} from "react-native";
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import UserOwnAds from "./UserOwnAds/UserOwnAds";
import Messages from "./Messages/Messages";
import UserCreateAd from "./UserCreateAd/UserCreateAd";
import {useSelector} from "react-redux";
import AdminAdDetails from "./AdminTabs/AdminAdDetails";
import NewAds from "./AdminTabs/NewAds";
import PaidAds from "./AdminTabs/PaidAds";
import {getUserAllAds} from "../../store/actions/adsActions";

const width = Dimensions.get('window').width;

const BackOfficeTabs = () => {
    const adsState = useSelector(state => state.ads);
    const userState = useSelector(state => state.users);
    const [tab, setTab] = useState(0);
    const [admin, setAdmin] = useState(false);
    const [title1, setTitle1] = useState(' Мои объявления');
    const [title2, setTitle2] = useState(" Создать объявление");
    const [title3, setTitle3] = useState(" Сообщения");

    useEffect(() => {
        if (userState.user === "admiN01") {
            setAdmin(true);
            setTitle1(' Новые объявления');
            setTitle2(' Админ таб');
            setTitle3(' Оплаченные объявления');
        }
    }, [])

    const getAds = (num) => {
        // getUserAllAds()
        setTab(num);
    }

    return (
        <>
            <View>
                <View style={styles.button}><Button
                    onPress={() => getAds(0)}
                    icon={
                        <Icon
                            name="briefcase"
                            size={15}
                            color="white"
                        />
                    }
                    title={title1}
                />
                </View>
                <View style={styles.button}><Button
                    onPress={() => setTab(1)}
                    icon={
                        <Icon
                            name="arrow-right"
                            size={15}
                            color="white"
                        />
                    }
                    title={title2}
                />
                </View>
                <View style={styles.button}><Button
                    onPress={() => setTab(2)}
                    icon={
                        <Icon
                            name="arrow-right"
                            size={15}
                            color="white"
                        />
                    }
                    title={title3}
                />
                </View>
            </View>
            {!admin ? <View style={styles.container2}>
                    {tab === 0 ? <UserOwnAds/> : null}
                    {tab === 1 ? <UserCreateAd/> : null}
                    {tab === 2 ? <Messages/> : null}
                </View> :
                <View style={styles.container2}>
                    {tab === 0 ? <NewAds/> : null}
                    {tab === 1 ? <AdminAdDetails/> : null}
                    {tab === 2 ? <PaidAds/> : null}
                </View>}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        width: width
    },
    container2: {
        marginTop: 20,
        marginBottom: 900
    },
    button: {
        marginTop: 3
    }
});

export default BackOfficeTabs;