import React, { useState, getState } from 'react'
import { Button, View, Text } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { connect } from 'react-redux'

export default function SingleHouse(props) {
    const [notes, setNotes] = useState('')
    const [pros, setPros] = useState('')
    const [cons, setCons] = useState('')

    const onSubmit = () => {
        if (Button.name === 'pros') {

        } else if (Button.name === 'cons') {

        } else {
            //  notes
        }
    }




    const house = props.route.params.house
    return (
        <View style={{ height: 275, paddingLeft: 32 }}>
            {house.map((house, index) => (

                <View key={index}>
                    <Image style={{ height: 200, width: 200 }} source={require('../../app/assets/house.png')}></Image>
                    <Text>
                        {house.address}
                    </Text>
                </View>

            ))}
            <View>
                <View>
                    <TextInput
                        placeholder='notes'
                        onChangeText={(notes) => setNotes(notes)}
                        value={notes}
                    />
                    <Button name='notes'></Button>
                </View>
                <View>
                    <TextInput
                        placeholder='pros'
                        onChangeText={(pros) => setPros(pros)}
                        value={pros}
                    />
                </View>
                <View>
                    <Button name='pros'></Button>
                    <TextInput
                        placeholder='cons'
                        onChangeText={(cons) => setCons(cons)}
                        value={cons}
                    />
                    <Button name='cons'></Button>
                </View>
            </View>
        </View>
    )

}