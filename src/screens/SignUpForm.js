
import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { firebase } from '../firebase/config'
import WelcomeScreen from './WelcomeScreen'

export default function SignUpForm({ navigation }) {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const onFooterLinkPress = () => {
        navigation.navigate('LogInForm')
    }

    const onRegisterPress = () => {
        if (password !== confirmPassword) {
            alert("Passwords don't match.")
            return
        }
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const data = {
                    id: uid,
                    email,
                    fullName,
                };
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {
                        navigation.navigate('Welcome', { user: data })
                    })
                    .catch((error) => {
                        alert(error)
                    });
            })
            .catch((error) => {
                alert(error)
            });
    }



    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <TextInput
                    style={styles.input}
                    placeholder='Full Name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setFullName(text)}
                    value={fullName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
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
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Confirm Password'
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onRegisterPress()}>
                    <Text style={styles.buttonTitle}>Create account</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}












// import React from 'react'
// import { StyleSheet, Button, TextInput, View, Text } from 'react-native'
// import { Formik } from 'formik'
// import colors from '../../app/config/colors'
// import styles from '../../app/config/styles'

// export default function SignUpForm() {
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
//                         <View >
//                             <TextInput
//                                 style={styles.input}
//                                 placeholder='first name'
//                                 onChangeText={props.handleChange('firstName')}
//                                 value={props.values.firstName}
//                             />
//                             <TextInput
//                                 style={styles.input}
//                                 placeholder='last name'
//                                 onChangeText={props.handleChange('lastName')}
//                                 value={props.values.lastName}
//                             />
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