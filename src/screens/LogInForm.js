import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import WelcomeScreen from './WelcomeScreen'
import AllHousesList from './AllHousesList'
import { firebase } from '../firebase/config'

export default function LogInForm({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onFooterLinkPress = () => {
        navigation.navigate('SignUpForm')
    }

    const onLoginPress = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .get()
                    .then(firestoreDocument => {
                        if (!firestoreDocument.exists) {
                            alert("User does not exist anymore.")
                            return;
                        }
                        const user = firestoreDocument.data()
                        navigation.navigate('AllHousesList', { user })
                    })
                    .catch(error => {
                        alert(error)
                    });
            })
            .catch(error => {
                alert(error)
            })
    }



    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">

                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}















// import React from 'react'
// import { StyleSheet, Button, TextInput, View, Text } from 'react-native'
// import { Formik } from 'formik'
// import colors from '../../app/config/colors'

// export default function LogInForm() {
//     return (
//         <View>
//             <Formik
//                 initialValues={{
//                     email: '',
//                     password: ''
//                 }}
//                 onSubmit={(values) => {
//                     console.log(values)
//                 }}
//             >
//                 {
//                     (props) => (
//                         <View>
//                             <TextInput
//                                 style={styles.input}
//                                 placeholder='email'
//                                 onChangeText={props.handleChange('email')}
//                                 value={props.values.email}
//                             />
//                             <TextInput
//                                 style={styles.input}
//                                 placeholder='password'
//                                 onChangeText={props.handleChange('password')}
//                                 value={props.values.password}
//                             />

//                             <Button title='submit'
//                                 color={colors.pink}
//                                 onPress={props.handleSubmit}
//                             ></Button>
//                         </View>
//                     )
//                 }

//             </Formik>

//         </View>
//     )
// }