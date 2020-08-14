import React from 'react'
import { StyleSheet, Button, TextInput, View, Text } from 'react-native'
import { Formik } from 'formik'
import colors from '../config/colors'
import styles from '../config/styles'

export default function SignUpForm() {
    return (
        <View>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                onSubmit={(values) => {
                    console.log(values)
                }}
            >
                {
                    (props) => (
                        <View >
                            <TextInput
                                style={styles.input}
                                placeholder='first name'
                                onChangeText={props.handleChange('firstName')}
                                value={props.values.firstName}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder='last name'
                                onChangeText={props.handleChange('lastName')}
                                value={props.values.lastName}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder='email'
                                onChangeText={props.handleChange('email')}
                                value={props.values.email}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder='password'
                                onChangeText={props.handleChange('password')}
                                value={props.values.password}
                            />

                            <Button title='submit'
                                color={colors.pink}
                                onPress={props.handleSubmit}
                            ></Button>
                        </View>
                    )
                }

            </Formik>

        </View>
    )
}