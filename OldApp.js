// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { StyleSheet, Text, View, Image, TouchableHighlight, SafeAreaView, Alert, Button } from 'react-native';
// import { useDimensions, useDeviceOrientation } from '@react-native-community/hooks'

// export default function App() {
//     const orientation = useDeviceOrientation()
//     return (
//         <SafeAreaView style={styles.container}>
//             <Text>Hello World</Text>
//             <StatusBar style="auto" />
//             <TouchableHighlight onPress={() => console.log('imageTouched')}>
//                 <Image source={{
//                     width: 200,
//                     height: 300,
//                     uri: 'https://loremflickr.com/320/240/house'
//                 }} />
//             </TouchableHighlight>
//             <Button
//                 color="orange"
//                 title="Click Me"
//                 onPress={() =>
//                     Alert.prompt("mytitle", 'my message', text => console.log(text))} />

//         </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
// });
