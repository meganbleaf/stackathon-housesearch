import React, { Component, useReducer, useEffect } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text, Button, InteractionManager, FlatList, ScrollViewComponent, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import colors from '../../app/config/colors'
import { Entypo, AntDesign } from '@expo/vector-icons'
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
                <Text style={{ alignSelf: "center", justifyContent: 'center', padding: 18 }}>Add a house to your list</Text>
                <TouchableOpacity onPress={() => props.navigation.navigate('AddHouse', { userId })} style={theseStyles.addList}>
                    <Entypo alignItems={'center'} name="plus" size={20} color={'#fff'} />
                </TouchableOpacity>
            </View>)

    }

    return (

        <View style={theseStyles.container} >

            <View style={{ flexDirection: 'column' }}>
                <Text style={theseStyles.title}>Add House</Text>
            </View>


            <View >
                <TouchableOpacity onPress={() => props.navigation.navigate('AddHouse', { userId })} style={theseStyles.addList}>
                    <Entypo alignItems={'center'} name="plus" size={20} color={'#fff'} />
                </TouchableOpacity>
            </View>


            <View style={{ height: 275, paddingLeft: 32 }}>
                <View>
                    <View >

                        <View  >
                            {houses.filter((house) => house.status === 'Visited').map((house, index) => (
                                <TouchableOpacity key={index} onPress={() => { props.navigation.navigate('SingleHouse', { house, userId }) }} >
                                    <View style={theseStyles.houseBlock} backgroundColor={colors.purple}  >

                                        <Image style={{ height: 50, width: 50 }} source={require('../../app/assets/house.png')}></Image>


                                        <Text style={{ color: 'white' }}>
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

                    <View>

                        {houses.filter((house) => house.status === 'Scheduled').map((house, index) => (
                            <TouchableOpacity key={index} onPress={() => { props.navigation.navigate('SingleHouse', { house, userId }) }} >
                                <View style={theseStyles.houseBlock} backgroundColor={colors.teal} >
                                    <Image style={{ height: 50, width: 50 }} source={require('../../app/assets/house.png')}></Image>
                                    <Text style={{ color: 'white' }} >
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

                        {houses.filter((house) => house.status === 'To Schedule').map((house, index) => (
                            <TouchableOpacity key={index} onPress={() => { props.navigation.navigate('SingleHouse', { house, userId }) }} >
                                <View backgroundColor={colors.pink} style={theseStyles.houseBlock} >

                                    <Image style={{ height: 50, width: 50 }} source={require('../../app/assets/house.png')}></Image>

                                    <Text style={{ color: 'white' }} >
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
        fontSize: 38,
        fontWeight: "400",
        color: colors.black,
        padding: 20
        // paddingHorizontal: 64
    },
    addList: {
        marginLeft: 190,
        marginRight: 190,
        height: 30,
        borderWidth: 2,
        backgroundColor: colors.teal,
        borderRadius: 4,
        alignItems: "center",
        alignContent: 'center',
        justifyContent: "center"
    },
    visited: {
        backgroundColor: colors.purple
    },
    houseBlock: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginLeft: 30,
        marginRight: 70,
        marginTop: 20,
        height: 100,
        width: 350,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'space-around'

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