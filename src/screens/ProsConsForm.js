import React, { useState } from 'react'
import { StyleSheet, Button, TextInput, View, Text, TouchableOpacity, Picker, Slider } from 'react-native'
import { useLinkProps } from '@react-navigation/native'
import { connect } from 'react-redux'
import { addNew } from '../store/prosandcons'

import colors from '../../app/config/colors'



export function ProsConsForm(props) {



    const [type, setType] = useState('')
    const [input, setInput] = useState('')
    const [score, setScore] = useState('')

    const userId = props.userId
    const houseId = props.houseId

    const handleSubmit = () => {
        const payload = { type, input, score }
        props.addNewProsAndCons(payload, userId, houseId)
    }

    console.log(score)
    return (
        <View >
            <View>
                <Picker onValueChange={(value) => {
                    setType(value)
                }} selectedValue={type}>
                    <Picker.Item label='Select One' />
                    <Picker.Item label='pro' value='pro' />
                    <Picker.Item label='con' value='con' />
                </Picker>

            </View>
            <TextInput
                style={styles.input}
                placeholder='input'
                onChangeText={(input) => setInput(input)}
                value={input}
            />
            <View style={styles.importance}>
                <Text style={{ fontSize: 18 }}>How important is this to you?</Text>
            </View>
            <Slider
                minimumValue={0}
                maximumValue={10}
                value={score}
                step={1}
                onValueChange={(value) => { setScore(value) }}

            />
            <View style={styles.score}>
                <Text style={{ fontSize: 24 }}>{score}</Text>
            </View>
            <View>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => handleSubmit()}
                ><Text style={styles.buttonTitle}>Add</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

const mapDispatchToProps = dispatch => {
    return {
        addNewProsAndCons: (payload, userId, houseId) => dispatch(addNew(payload, userId, houseId))
    }
}
export default connect(null, mapDispatchToProps)(ProsConsForm)

const styles = StyleSheet.create({
    input: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 20,
        height: 50,
        width: 400,
        borderColor: 'black',
        borderWidth: .5,
        borderRadius: 5,
        padding: 5
    },
    importance: {
        padding: 30,
        textAlign: 'center',
        marginLeft: 60
    },
    score: {
        padding: 30,
        textAlign: 'center',
        marginLeft: 170,

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