import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text, Button, List, ListItem, Icon, InteractionManager } from 'react-native';
import firebase from '../firebase/config';

class AllHousesList extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'AllHousesList',
            headerRight: (
                <Button
                    buttonStyle={{ padding: 0, backgroundColor: 'transparent' }}
                    icon={{ name: 'add-circle', style: { marginRight: 0, fontSize: 28 } }}
                    onPress={() => { navigation.push('AddHouse') }}
                />
            ),
        };
    };
    constructor() {
        super();
        this.ref = firebase.firestore().collection('houses');
        this.unsubscribe = null;
        this.state = {
            isLoading: true,
            houses: []
        };
    }
    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }
    onCollectionUpdate = (querySnapshot) => {
        const houses = [];
        querySnapshot.forEach((doc) => {
            const { address, image, photos, pros, cons, notes, price, status } = doc.data();
            houses.push({
                key: doc.id,
                doc, // DocumentSnapshot
                address,
                image,
                photos,
                pros,
                cons,
                notes,
                price,
                status
            });
        });
        this.setState({
            houses,
            isLoading: false,
        });
    }
    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.activity}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        }
        return (
            <ScrollView style={styles.container}>
                <List>
                    {
                        this.state.houses.map((item, i) => (
                            <ListItem
                                key={i}
                                address={item.address}
                                image={item.image}
                                status={item.status}
                                onPress={() => {
                                    this.props.navigation.navigate('SingleHouse', {
                                        housekey: `${JSON.stringify(item.key)}`,
                                    });
                                }}
                            />
                        ))
                    }
                </List>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    activity: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default AllHousesList;