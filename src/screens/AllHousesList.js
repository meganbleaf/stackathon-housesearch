import React, { Component, useReducer, useEffect } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text, Button, InteractionManager, FlatList, ScrollViewComponent, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import colors from '../../app/config/colors'
import { AntDesign } from '@expo/vector-icons'
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
                <Text>No saved houses</Text>
                <TouchableOpacity onPress={() => props.navigation.navigate('AddHouse', { userId })} style={theseStyles.addList}>
                    <AntDesign name="plus" size={16} color={colors.blue} />
                    {/* <Button title='add house' }>Add A New House</Button> */}
                </TouchableOpacity>
            </View>)

    }

    return (

        <View style={theseStyles.container}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={theseStyles.title}>Add House</Text>
            </View>
            <View style={{ marginVertical: 48 }}>
                <TouchableOpacity onPress={() => props.navigation.navigate('AddHouse', { userId })} style={theseStyles.addList}>
                    <AntDesign name="plus" size={16} color={colors.blue} />
                    {/* <Button title='add house' }>Add A New House</Button> */}
                </TouchableOpacity>
            </View>
            <View style={{ height: 275, paddingLeft: 32 }}>
                {houses.map((house, index) => (
                    <View key={index}>
                        <TouchableOpacity onPress={() => { props.navigation.navigate('SingleHouse', { house }) }} >
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
        fontSize: 38,
        fontWeight: "400",
        color: colors.black,
        paddingHorizontal: 64
    },
    addList: {
        borderWidth: 2,
        borderColor: colors.teal,
        borderRadius: 4,
        padding: 16,
        alignItems: "center",
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