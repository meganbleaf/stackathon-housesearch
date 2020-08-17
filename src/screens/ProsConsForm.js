import React, { useState } from 'react'
import { StyleSheet, Button, TextInput, View, Text, TouchableOpacity, Picker, Slider } from 'react-native'
import { useLinkProps } from '@react-navigation/native'
import { connect } from 'react-redux'
import { addNew } from '../store/prosandcons'





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
                <Text>Type</Text>
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
            <Text>How important is this to you?</Text>

            <Slider
                minimumValue={0}
                maximumValue={10}
                value={score}
                step={1}
                onValueChange={(value) => { setScore(value) }}

            />

            <Text>{score}</Text>
            <View>
                <Button onPress={() => handleSubmit()} title='add'></Button>
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

{/* <View>
<Formik
    initialValues={{
        input: '',
        score: 0,
        type: ''
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
                    placeholder='input'
                    onChangeText={props.handleChange('input')}
                    value={props.values.input}
                />
                <TextInput
                    style={styles.input}
                    placeholder='score'
                    onChangeText={props.handleChange('score')}
                    value={props.values.score}
                />
                <TextInput
                    style={styles.input}
                    placeholder='type'
                    onChangeText={props.handleChange('type')}
                    value={props.values.type}
                />

                <Button title='submit'
                    onPress={props.handleSubmit}
                ></Button>
            </View>
        )
    }

</Formik>

</View> */}