import React, { useState, getState, useEffect } from 'react'
import { Button, View, Text, Image, Modal, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { getSingleHouseThunk, } from '../store/house'
import { updateSingleHouseThunk } from '../store/house'
import { fetchProsAndCons } from '../store/prosandcons'
import ImagePickerButton from '../utils/ImagePicker'
import { MaterialIcons, AntDesign } from '@expo/vector-icons'
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
            <View >
                <View style={styles.houseInfo}>
                    <Image style={styles.houseImage} source={require('../../app/assets/house.png')}></Image>
                    <View style={styles.infobox}>
                        <View>
                            <Text style={{ fontSize: 20, fontWeight: '500' }}>Address: {house.address}</Text>
                            <Text style={{ fontSize: 18, fontWeight: '300' }}>Price: {house.price}</Text>
                            <Text style={{ fontSize: 18, fontWeight: '300' }}>Status: {house.status}</Text>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => props.navigation.navigate('UpdateHouse', { house, userId })}
                            >
                                <AntDesign
                                    name='edit'
                                    size={24}
                                    color='black'
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>


                <View>
                    <Modal visible={modalOpen} animationType='slide' >
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={styles.modalContent}>
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
            </View >

            <View style={styles.decisionscore}>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Decision Score: {score(prosandconsArr)}</Text>

            </View>

            <MaterialIcons
                name='add'
                size={24}
                onPress={() => setModalOpen(true)}
                style={styles.modalToggle}
            />
            <View>
                <View >
                    {prosandconsArr.filter((prosandcons) => prosandcons.type === 'pro').map((pro, index) => (
                        <View style={styles.prosbox} key={index}>
                            <Text style={{ color: 'black', fontWeight: '500' }}>
                                {pro.input}
                            </Text>
                        </View>

                    ))}
                </View>
                <View  >
                    {prosandconsArr.filter((prosandcons) => prosandcons.type === 'con').map((con, index) => (
                        <View style={styles.consbox} key={index}>
                            <Text style={{ color: 'black', fontWeight: '500' }}>
                                {con.input}
                            </Text>
                        </View>

                    ))}
                </View>
            </View>
        </View >

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
        marginTop: 10,
        borderWidth: 1,
        borderColor: colors.blue,
        padding: 5,
        borderRadius: 5,
        alignSelf: 'center'

    },
    modalClose: {
        marginTop: 25,
        marginBottom: 0
    },
    modalContent: {
        flex: 1
    },
    houseInfo: {
        flexDirection: 'column',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    prosbox: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        marginLeft: 30,
        marginRight: 70,
        marginTop: 20,
        height: 30,
        width: 350,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: colors.green,
    },
    consbox: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        marginLeft: 30,
        marginRight: 70,
        marginTop: 20,
        height: 30,
        width: 350,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: colors.orange
    },
    infobox: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 100,
        width: 350,
        borderRadius: 5,
        alignItems: 'center',
        padding: 5,
        justifyContent: 'space-around',
    },
    updateicon: {

    },
    decisionscore: {
        alignSelf: 'center',
        fontSize: 30,
        marginTop: 15,

    },
    houseImage: {
        height: 200,
        width: 200,
        alignSelf: 'center',
        marginRight: 60

    }

})



