import React, { useState, getState, useEffect } from 'react'
import { Button, View, Text, Image } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { updateSingleHouseThunk } from '../store/houses'


export function UpdateHouse(props) {
    const [price, setPrice] = useState('')
    const [status, setStatus] = useState('')
    const [address, setAddress] = useState('')
    const houseId = props.route.params.house.id
    const onSubmit = async () => {
        const payload = { price: price, status: status, address: address }
        const userId = props.route.params.userId
        props.updateHouse(userId, houseId, payload)
        props.navigation.navigate('AllHousesList')
    }

    return (
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
            <TextInput
                style={styles.input}
                placeholder='status'
                onChangeText={(status) => setStatus(status)}
                value={status}
            />
            <Button onPress={() => onSubmit()} title='update house'>submit updates</Button>
        </View>
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