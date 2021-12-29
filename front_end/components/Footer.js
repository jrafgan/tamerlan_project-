import React from 'react'
import {View, Text, StyleSheet,
} from 'react-native'
import { SocialIcon } from 'react-native-elements'

const Footer = () => {
    return (
        <View style={styles.footer}>
            <SocialIcon style={styles.icon}
                type='twitter'
            />

            <SocialIcon style={styles.icon}
                type='gitlab'
            />

            <SocialIcon style={styles.icon}
                type='linkedin'
            />

            <SocialIcon style={styles.icon}
                iconSize={30}
                type='instagram'
            />
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        marginTop: 0,
        position: 'absolute',
        bottom: 0,
    },
    icon: {
        width: 40,
        height: 40
    }
});

export default Footer;