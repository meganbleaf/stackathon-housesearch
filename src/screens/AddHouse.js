import React from 'react'
import { StyleSheet, Button, TextInput, View, Text, Image } from 'react-native'
import { Formik } from 'formik'
import colors from '../../app/config/colors'
import styles from '../../app/config/styles'

export default function AddHouse() {
    return (
        <View>
            <Image
                style={styleSheet.image}
                source={{ uri: 'https://images.unsplash.com/photo-1488707872600-5507977fe355?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjF9&auto=format&fit=crop&w=2100&q=80' }}></Image>
            <View>
                <Formik
                    initialValues={{
                        price: '',
                        status: '',
                        photos: ''
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
                                    placeholder='house price'
                                    onChangeText={props.handleChange('price')}
                                    value={props.values.price}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder='status'
                                    onChangeText={props.handleChange('status')}
                                    value={props.values.status}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder='photos'
                                    onChangeText={props.handleChange('photos')}
                                    value={props.values.photos}
                                />

                                <Button title='Add To My List'
                                    color={colors.pink}
                                    onPress={props.handleSubmit}
                                ></Button>
                            </View>
                        )
                    }

                </Formik>

            </View>
        </View>
    )
}

const styleSheet = StyleSheet.create({
    image: {
        height: 300,
        width: 300
    }
})