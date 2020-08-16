// import React, { useState, getState, useEffect } from 'react'
// import { Button, View, Text, Image } from 'react-native'
// import { TextInput } from 'react-native-gesture-handler'
// import { connect } from 'react-redux'
// import { updateSingleHouseThunk } from '../store/houses'
// import { Slider } from '@react-native-community/slider'


// export function prosAndCons(props) {
//     const [pros, setPros] = useState('')
//     const [cons, setCons] = useState('')
//     return (
//         <View >
//             <TextInput
//                 style={styles.input}
//                 placeholder='pros'
//                 onChangeText={(pros) => setPros(pros)}
//                 value={pros}
//             />
//             <Slider style={{width: 200, height: 40}}
//                     minimumValue={0}
//                     maximumValue={1}
//                     minimumTrackTintColor="#FFFFFF"
//                      maximumTrackTintColor="#000000"></Slider>
//             <Button onPress={() => onSubmit()} title='update house'>submit updates</Button>
//             <TextInput
//                 style={styles.input}
//                 placeholder='cons'
//                 onChangeText={(cons) => setCons(cons)}
//                 value={cons}
//             />
//             <Slider style={{width: 200, height: 40}}
//                     minimumValue={0}
//                     maximumValue={1}
//                     minimumTrackTintColor="#FFFFFF"
//                     maximumTrackTintColor="#000000"></Slider>
//             <Button onPress={() => onSubmit()} title='update house'>submit updates</Button>
//         </View>
//     )

// }

// }