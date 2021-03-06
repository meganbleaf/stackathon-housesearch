import React, { Component, useReducer, useEffect } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text, Button, InteractionManager, FlatList, ScrollViewComponent, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import colors from '../../app/config/colors'
import { Entypo, AntDesign, MaterialIcons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { fetchHouses, deleteHouseThunk } from '../store/houses'
import { connect } from 'react-redux'
import { firebase } from '../firebase/config'
import { Divider } from 'react-native-elements'

export function AllHousesList(props) {

    const userId = props.route.params.user.id

    useEffect(() => {
        props.getAllHouses(userId)
    }, [])

    const { houses, loading } = props.houses
    if (loading) {
        return <Text>Loading your saved houses</Text>
    } else if (!loading && houses.length === 0) {
        return (
            <View>
                <Text style={{ alignSelf: "center", justifyContent: 'center', padding: 18, fontSize: 24 }}>Add a house to your list</Text>
                <TouchableOpacity onPress={() => props.navigation.navigate('AddHouse', { userId })} >
                    <MaterialIcons
                        name='add'
                        size={24}
                        style={theseStyles.addButton} />
                </TouchableOpacity>
            </View>)

    }

    return (

        <View style={theseStyles.container} >

            <View style={{ flexDirection: 'column' }}>
                <Text style={{ ...theseStyles.title, fontWeight: '600' }}>My Houses</Text>
            </View>


            <View >
                <TouchableOpacity onPress={() => props.navigation.navigate('AddHouse', { userId })} >
                    <MaterialIcons
                        name='add'
                        size={24}
                        style={theseStyles.addButton}
                    />
                </TouchableOpacity>
            </View>


            <View style={{ height: 275, paddingLeft: 32 }}>
                <View>
                    <View >
                        <Text style={theseStyles.header}>Visited</Text>
                        <Divider></Divider>
                        <View  >
                            {houses.filter((house) => house.status === 'Visited').map((house, index) => (
                                <TouchableOpacity key={index} onPress={() => { props.navigation.navigate('SingleHouse', { house, userId }) }} >
                                    <View style={theseStyles.houseBlock} backgroundColor={colors.purple}  >

                                        <Image style={{ height: 50, width: 50 }} source={require('../../app/assets/house.png')}></Image>


                                        <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>
                                            {house.address}
                                        </Text>
                                        <TouchableOpacity onPress={() => props.deleteHouse(userId, house.id)}>
                                            <AntDesign alignItems={'center'} name="delete" size={24} color='black' />
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>

                    </View>

                    <View>
                        <Text style={theseStyles.header}>Scheduled</Text>
                        <Divider></Divider>
                        {houses.filter((house) => house.status === 'Scheduled').map((house, index) => (
                            <TouchableOpacity key={index} onPress={() => { props.navigation.navigate('SingleHouse', { house, userId }) }} >
                                <View style={theseStyles.houseBlock} backgroundColor={colors.teal} >
                                    <Image style={{ height: 50, width: 50 }} source={require('../../app/assets/house.png')}></Image>
                                    <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }} >
                                        {house.address}
                                    </Text>
                                    <TouchableOpacity onPress={() => props.deleteHouse(userId, house.id)}>
                                        <AntDesign alignItems={'center'} name="delete" size={24} color={colors.black} />
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View>
                        <Text style={theseStyles.header}>To Schedule</Text>
                        <Divider></Divider>
                        {houses.filter((house) => house.status === 'To Schedule').map((house, index) => (
                            <TouchableOpacity key={index} onPress={() => { props.navigation.navigate('SingleHouse', { house, userId }) }} >
                                <View style={theseStyles.houseBlock} backgroundColor={colors.pink} >
                                    <Image style={{ height: 50, width: 50 }} source={require('../../app/assets/house.png')}></Image>
                                    <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }} >
                                        {house.address}
                                    </Text>
                                    <TouchableOpacity onPress={() => props.deleteHouse(userId, house.id)}>
                                        <AntDesign alignItems={'center'} name="delete" size={24} color={colors.black} />
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                </View>

            </View>
        </View>


    )

}






const theseStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 5
    },
    title: {
        alignSelf: "center",
        justifyContent: 'center',
        fontSize: 30,
        color: colors.black,
        padding: 20

    },
    visited: {
        backgroundColor: colors.purple
    },
    houseBlock: {
        fontSize: 18,
        fontWeight: 'bold',
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginLeft: 30,
        marginRight: 70,
        marginTop: 20,
        height: 60,
        width: 350,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'space-around'

    },
    addButton: {
        marginBottom: 10,
        marginTop: 10,
        marginRight: 2,
        borderWidth: 1,
        borderColor: 'black',
        padding: 2,
        borderRadius: 5,
        alignSelf: 'center'
    },
    header: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 15,
        marginLeft: 20,

    }

})


const mapStateToProps = state => {
    return {
        houses: state.houses
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllHouses: (userId) => dispatch(fetchHouses(userId)),
        deleteHouse: (userId, id) => dispatch(deleteHouseThunk(userId, id))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(AllHousesList)