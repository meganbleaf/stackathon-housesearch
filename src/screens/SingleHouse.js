import React, { useState, getState, useEffect } from 'react'
import { Button, View, Text, Image, Modal, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { getSingleHouseThunk, } from '../store/house'
import { updateSingleHouseThunk } from '../store/house'
import { fetchProsAndCons } from '../store/prosandcons'
import ImagePickerButton from '../utils/ImagePicker'
import { MaterialIcons } from '@expo/vector-icons'
import colors from '../../app/config/colors'
import ProsConsForm from './ProsConsForm'

export function SingleHouse(props) {
    const [modalOpen, setModalOpen] = useState(false)
    const house = props.house
    const houseId = props.route.params.house.id
    const userId = props.route.params.userId
    const prosandconsArr = props.prosandcons.prosandcons

    const score = (array) => {
        let sum = 0
        for (let i = 0; i < array.length; i++) {
            let currElem = array[i]
            console.log(currElem)
            if (currElem.type === 'pro') {
                sum += currElem.score

            } else {
                sum -= currElem.score
            }

        }
        return sum
    }






    useEffect(() => {
        props.getHouse(houseId, userId),
            props.getProsAndCons(houseId, userId)
    }, [])


    // if (loading) {
    //     return <Text>Loading your notes</Text>
    // } else if (!loading && prosandcons.length === 0) {
    //     return (
    //         <View>
    //             <Text>Add Some Pros and Cons</Text>
    //         </View>)

    // }


    return (
        <View>
            <View style={{ height: 275, paddingLeft: 32 }}>
                <Image style={{ height: 200, width: 200 }} source={require('../../app/assets/house.png')}></Image>

                <Text>{house.address}</Text>
                <Text>{house.price}</Text>
                <Text>{house.status}</Text>
                <Button onPress={() => props.navigation.navigate('UpdateHouse', { house, userId })} title='update'>update house</Button>

                <View>
                    <Modal visible={modalOpen} animationType='slide' >
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={styles.modalContent}>
                                <Text>testing the modal</Text>
                                <MaterialIcons
                                    style={{ ...styles.modalToggle, ...styles.modalClose }}
                                    name='close'
                                    size={24}
                                    onPress={() => setModalOpen(false)}

                                />
                                <ProsConsForm userId={userId} houseId={houseId} />
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                </View>
            </View>

            <View>
                <Text>Decision Score:{score(prosandconsArr)}</Text>
            </View>

            <MaterialIcons
                name='add'
                size={24}
                onPress={() => setModalOpen(true)}
                style={styles.modalToggle}
            />
            <View>
                <View  >
                    {prosandconsArr.filter((prosandcons) => prosandcons.type === 'pro').map((pro, index) => (
                        <View key={index}>
                            <Text style={{ color: 'black' }}>
                                {pro.input}
                            </Text>
                        </View>

                    ))}
                </View>
                <View  >
                    {prosandconsArr.filter((prosandcons) => prosandcons.type === 'con').map((con, index) => (
                        <View key={index}>
                            <Text style={{ color: 'black' }}>
                                {con.input}
                            </Text>
                        </View>

                    ))}
                </View>
            </View>
        </View>

    )

}

const mapStateToProps = state => {
    return {
        house: state.house,
        prosandcons: state.prosandcons
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getHouse: (houseId, userId) => dispatch(getSingleHouseThunk(houseId, userId)),
        getProsAndCons: (userId, houseId) => dispatch(fetchProsAndCons(userId, houseId))
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



