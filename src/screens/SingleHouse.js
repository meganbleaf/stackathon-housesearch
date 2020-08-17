import React, { useState, getState, useEffect } from 'react'
import { Button, View, Text, Image, Modal, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { getSingleHouseThunk, updateSingleHouseThunk } from '../store/house'
import ImagePickerButton from '../utils/ImagePicker'
import { MaterialIcons } from '@expo/vector-icons'
import colors from '../../app/config/colors'
import ProsConsForm from './ProsConsForm'

export function SingleHouse(props) {
    const [notes, setNotes] = useState('')
    const [pros, setPros] = useState('')
    const [cons, setCons] = useState('')
    const [modalOpen, setModalOpen] = useState(false)
    const house = props.route.params.house
    const houseId = props.route.params.house.id
    const userId = props.route.params.userId


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
        <View>
            <View style={{ height: 275, paddingLeft: 32 }}>
                <Image style={{ height: 200, width: 200 }} source={require('../../app/assets/house.png')}></Image>

                <Text>{house.address}</Text>
                <Text>{house.price}</Text>
                <Text>{house.status}</Text>
                <Button onPress={() => props.navigation.navigate('UpdateHouse', { house, userId })} title='update'>update house</Button>

                <View>
                    <Modal visible={modalOpen} animationType='slide'>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={styles.modalContent}>
                                <Text>testing the modal</Text>
                                <MaterialIcons
                                    style={{ ...styles.modalToggle, ...styles.modalClose }}
                                    name='close'
                                    size={24}
                                    onPress={() => setModalOpen(false)}
                                />
                                <ProsConsForm />
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                </View>
            </View>

            <MaterialIcons
                name='add'
                size={24}
                onPress={() => setModalOpen(true)}
                style={styles.modalToggle}
            />
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

const styles = StyleSheet.create({
    modalToggle: {
        marginBottom: 10,
        marginTop: 50,
        borderWidth: 1,
        borderColor: colors.blue,
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center'

    },
    modalClose: {
        marginTop: 25,
        marginBottom: 0
    },
    modalContent: {
        flex: 1
    }
})