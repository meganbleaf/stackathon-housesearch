import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text, Button, List, ListItem, Icon, InteractionManager } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../firebase/config';

export default function AllHousesList({ navigation }) {

    return (
        <View>
            <Button title='add house' onPress={() => navigation.navigate('AddHouse')}>Add A New House</Button>
            <View>
                <Text>Made it to All Houses List</Text>
            </View>
        </View>
    )


}

