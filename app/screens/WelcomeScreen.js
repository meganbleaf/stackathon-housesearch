import React from 'react'
import { ImageBackground, StyleSheet, View, Image, Text } from 'react-native';

import colors from '../config/colors'

const image = { uri: "https://cdn-0.preppywallpapers.com/wp-content/uploads/2019/01/Europe-iPhone-Wallpaper-11.jpg" }

const WelcomeScreen = (props) => {
    return (
        <ImageBackground
            style={styles.background}
            source={image}
        >
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../assets/logo.png')} />
                <Text>Notes for House Hunters</Text>
            </View>
            <View style={styles.loginButton}></View>
            <View style={styles.signUpButton}></View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },

    logo: {
        width: 400,
        height: 400,
    },
    logoContainer: {
        position: 'absolute',
        top: 25,
        alignItems: 'center'
    },
    signUpButton: {
        width: '100%',
        height: 70,
        backgroundColor: colors.orange,
    },
    loginButton: {
        width: '100%',
        height: 70,
        backgroundColor: colors.pink,
    },
})

export default WelcomeScreen;