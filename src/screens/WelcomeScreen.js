import React from 'react'
import { ImageBackground, StyleSheet, View, Image, Text, Button } from 'react-native';


import colors from '../../app/config/colors'


const image = { uri: "https://cdn-0.preppywallpapers.com/wp-content/uploads/2019/01/Europe-iPhone-Wallpaper-11.jpg" }

const WelcomeScreen = ({ navigation }) => {
    return (
        <ImageBackground
            imageStyle={{ opacity: 0.6 }}
            style={styles.background}
            source={image}
        >
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../../app/assets/logo.png')} />
                <Text style={styles.text}>Notes for House Hunters</Text>
            </View>
            <Button title='login' style={styles.loginButton}
                onPress={() => navigation.navigate('LogInForm')}
            ></Button>
            <Button title='signup' style={styles.button}
                onPress={() => navigation.navigate('SignUpForm')}></Button>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({

    background: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    logo: {
        opacity: 1,
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
        color: colors.orange,
    },
    loginButton: {
        width: '100%',
        height: 70,
        backgroundColor: colors.pink,
    },
    text: {
        fontWeight: '800',
        fontSize: 24,
        color: colors.pink,
        textShadowColor: 'white',
        textShadowRadius: 5
    },
    button: {
        backgroundColor: '#788eec',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
})

export default WelcomeScreen;