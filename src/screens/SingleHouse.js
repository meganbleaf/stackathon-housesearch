import React, { useState, getState, useEffect } from 'react'
import { Button, View, Text, Image } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { getSingleHouseThunk } from '../store/house'
import ImagePickerButton from '../utils/ImagePicker'

export function SingleHouse(props) {
    const [notes, setNotes] = useState('')
    const [pros, setPros] = useState('')
    const [cons, setCons] = useState('')
    const house = props.route.params.house
    const houseId = props.route.params.house.id
    const userId = props.route.params.userId
    console.log("can we just use house as props?", house)

    // useEffect(() => {
    //     props.getHouse(houseId, userId)
    // }, [])

    const onSubmit = () => {
        if (Button.name === 'pros') {

        } else if (Button.name === 'cons') {

        } else {
            //  notes
        }
    }





    return (
        <View style={{ height: 275, paddingLeft: 32 }}>
            <Image style={{ height: 200, width: 200 }} source={require('../../app/assets/house.png')}></Image>
            <View>
                <Text>{house.address}</Text>
                <Text>{house.price}</Text>
                <Text>{house.status}</Text>

            </View>
            <View>
                <View>
                    <TextInput
                        placeholder='notes'
                        onChangeText={(notes) => setNotes(notes)}
                        value={notes}
                    />
                    <Button title='add notes'></Button>
                </View>
                <View>
                    <TextInput
                        placeholder='pros'
                        onChangeText={(pros) => setPros(pros)}
                        value={pros}
                    />
                </View>
                <View>
                    <Button title='add pros'></Button>
                    <TextInput
                        placeholder='cons'
                        onChangeText={(cons) => setCons(cons)}
                        value={cons}
                    />
                    <Button title='add cons'></Button>
                </View>
                <View>
                    <ImagePickerButton />
                </View>
            </View>
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
        getHouse: (houseId, userId) => dispatch(getSingleHouseThunk(houseId, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleHouse)