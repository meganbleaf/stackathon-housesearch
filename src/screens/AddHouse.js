import React, { useState, getState } from 'react'
import { StyleSheet, Button, TextInput, View, Text, Image, Picker } from 'react-native'
import { Formik } from 'formik'
import colors from '../../app/config/colors'
import styles from '../../app/config/styles'
import { addNewHouse } from '../../src/store/houses'
import { connect } from 'react-redux'
import { getStateFromPath } from '@react-navigation/native'
import ImagePickerButton from '../utils/ImagePicker'


export function AddHouse(props) {
    const [price, setPrice] = useState('')
    const [status, setStatus] = useState('')
    const [photos, setPhotos] = useState('')
    const [address, setAddress] = useState('')

    const onSubmit = () => {
        const payload = { price, status, photos, address }
        const userId = props.route.params.userId
        props.addNewHouse(payload, userId)
        props.navigation.navigate('AllHousesList')
    }

    let data = [{
        value: 'Visited'
    }, {
        value: 'To Schedule Visit'
    }, {
        value: 'Visit Has Been Scheduled'
    }]

    const getValue = (value) => {
        setStatus(value)
    }


    return (
        <View>
            <Image
                style={styleSheet.image}
                source={{ uri: 'https://images.unsplash.com/photo-1488707872600-5507977fe355?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjF9&auto=format&fit=crop&w=2100&q=80' }}></Image>
            <View>
                <View >
                    <TextInput
                        style={styles.input}
                        placeholder='house address'
                        onChangeText={(address) => setAddress(address)}
                        value={address}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='house price'
                        onChangeText={(price) => setPrice(price)}
                        value={price}
                    />
                    {/* <TextInput
                        style={styles.input}
                        placeholder='status'
                        onChangeText={(status) => setStatus(status)}
                        value={status}
                    /> */}
                    <View>
                        <Text>Status</Text>
                        <Picker onValueChange={(value) => setStatus(value)} selectedValue={status}>

                            <Picker.Item label='Visited' value='Visited' />
                            <Picker.Item label='Scheduled' value='Scheduled' />
                            <Picker.Item label='To Schedule' value='To Schedule' />
                        </Picker>

                    </View>
                    {/* <TextInput
                        style={styles.input}
                        placeholder='photos'
                        onChangeText={(photos) => setPhotos(photos)}
                        value={photos}
                    /> */}
                    <ImagePickerButton />

                    <Button title='Add To My List'
                        color={colors.pink}
                        onPress={() => onSubmit()}
                    ></Button>
                </View>

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

const mapDispatchToProps = dispatch => {
    return {
        addNewHouse: (newHouse, userId) => dispatch(addNewHouse(newHouse, userId))
    }

}

export default connect(null, mapDispatchToProps)(AddHouse)