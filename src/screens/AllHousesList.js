import React, { Component, useReducer, useEffect } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text, Button, InteractionManager, FlatList, ScrollViewComponent, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import colors from '../../app/config/colors'
import { Entypo } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { fetchHouses, deleteHouseThunk } from '../store/houses'
import { connect } from 'react-redux'
import { firebase } from '../firebase/config'

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

        <View style={theseStyles.container}>
            <View style={{ flexDirection: 'column' }}>
                <Text style={theseStyles.title}>Add House</Text>
            </View>
            <View >
                <TouchableOpacity onPress={() => props.navigation.navigate('AddHouse', { userId })} style={theseStyles.addList}>
                    <Entypo alignItems={'center'} name="plus" size={20} color={'#fff'} />
                </TouchableOpacity>
            </View>
            <View style={{ height: 275, paddingLeft: 32 }}>
                {houses.map((house, index) => (
                    <View key={index}>
                        <TouchableOpacity onPress={() => { props.navigation.navigate('SingleHouse', { house, userId }) }} >
                            <Image style={{ height: 50, width: 50 }} source={require('../../app/assets/house.png')}></Image>
                            <Text>
                                {house.address}
                            </Text>
                        </TouchableOpacity>
                        <View>
                            <Button onPress={() => props.deleteHouse(userId, house.id)} title='delete'></Button>
                        </View>
                    </View>
                ))}
            </View>
        </View>


    )

}






const theseStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
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