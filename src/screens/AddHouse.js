import React, { useState, getState } from 'react'
import { StyleSheet, Button, TextInput, View, Text, Image, Picker, TouchableOpacity } from 'react-native'
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



    return (
        <View>
            <Image
                style={stylesHere.image}
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
                    <View>
                        <View style={stylesHere.status}>
                            <Text style={{ fontSize: 24, fontWeight: '400' }}>Status</Text>
                        </View>
                        <Picker
                            style={stylesHere.picker}
                            onValueChange={(value) => {
                                if (value === '') {
                                    value = 'Visited'
                                }
                                setStatus(value)
                            }} selectedValue={status}>
                            <Picker.Item label='Select One' itemStyle={{ backgroundColor: colors.blue }} />
                            <Picker.Item label='Visited' value='Visited' />
                            <Picker.Item label='Scheduled' value='Scheduled' />
                            <Picker.Item label='To Schedule' value='To Schedule' />
                        </Picker>

                    </View>
                    <ImagePickerButton />

                    <TouchableOpacity
                        style={stylesHere.addButton}
                        onPress={() => onSubmit()}
                    ><Text style={stylesHere.buttonTitle}>Add</Text>
                    </TouchableOpacity>


                </View>

            </View>
        </View>
    )
}



const mapDispatchToProps = dispatch => {
    return {
        addNewHouse: (newHouse, userId) => dispatch(addNewHouse(newHouse, userId))
    }

}

export default connect(null, mapDispatchToProps)(AddHouse)

const stylesHere = StyleSheet.create({
    image: {
        height: 300,
        width: 500,
        marginBottom: 15,
        alignContent: 'center',
        justifyContent: 'center'
    },
    status: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 50,

    },
    picker: {
        marginTop: 0
    },
    addButton: {
        backgroundColor: colors.purple,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
})