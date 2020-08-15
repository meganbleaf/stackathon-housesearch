import React, { Component, useReducer } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text, Button, InteractionManager, FlatList } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../firebase/config';
import styles from './styles';
import colors from '../../app/config/colors'
import { AntDesign } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function AllHousesList({ navigation }) {
    return (

        <View style={theseStyles.container}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={theseStyles.title}>Add House</Text>
            </View>
            <View style={{ marginVertical: 48 }}>
                <TouchableOpacity onPress={() => navigation.navigate('AddHouse')} style={theseStyles.addList}>
                    <AntDesign name="plus" size={16} color={colors.blue} />
                    {/* <Button title='add house' }>Add A New House</Button> */}
                </TouchableOpacity>
            </View>
            <View style={{ height: 275, paddingLeft: 32 }}>
                <FlatList>
                    {/* data ={tempData} */}
        keyExtractor={item => item.name}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
                        <View>
                            <Text>{item.name}</Text>
                        </View>
                    )}
                </FlatList>

            </View>


        </View>

    )

}

const mapStateToProps = state => {
    return {

    }
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
