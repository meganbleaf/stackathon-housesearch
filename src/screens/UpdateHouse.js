import React, { useState, getState, useEffect } from 'react'
import { Button, View, Text, Image, Picker, StyleSheet, TouchableOpacity } from 'react-native'
import { TextInput, ScrollView } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { updateSingleHouseThunk } from '../store/house'
import colors from '../../app/config/colors'


export function UpdateHouse(props) {
    const [price, setPrice] = useState('')
    const [status, setStatus] = useState('')
    const [address, setAddress] = useState('')

    const houseId = props.house.id
    const onSubmit = async () => {
        const payload = { price: price, status: status, address: address }
        const userId = props.route.params.userId
        props.updateHouse(userId, houseId, payload)
        props.navigation.navigate('SingleHouse')
    }

    return (
        <ScrollView style={theseStyles.container}>
            <View >
                <TextInput
                    style={theseStyles.input}
                    placeholder='house address'
                    onChangeText={(address) => setAddress(address)}
                    value={address}
                />
                <TextInput
                    style={theseStyles.input}
                    placeholder='house price'
                    onChangeText={(price) => setPrice(price)}
                    value={price}
                />
                <View>
                    <Text style={theseStyles.status}>Update Status</Text>
                    <Picker onValueChange={(value) => {
                        if (value === '') {
                            value = 'Visited'
                        }
                        setStatus(value)
                    }} selectedValue={status}>
                        <Picker.Item label='Select One' />
                        <Picker.Item label='Visited' value='Visited' />
                        <Picker.Item label='Scheduled' value='Scheduled' />
                        <Picker.Item label='To Schedule' value='To Schedule' />
                    </Picker>
                </View>
                <TouchableOpacity
                    style={theseStyles.addButton}
                    onPress={() => onSubmit()}
                ><Text style={theseStyles.buttonTitle}>submit updates</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )

}

const mapStateToProps = state => {
    return {
        house: state.house
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateHouse: (userId, houseId, payload) => dispatch(updateSingleHouseThunk(userId, houseId, payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateHouse)


const theseStyles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    input: {
        height: 48,
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 1,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    status: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 50,
        fontSize: 24,
        fontWeight: '400'

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