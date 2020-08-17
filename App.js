import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import colors from './app/config/colors'
import { WelcomeScreen, LogInForm, SignUpForm } from './src/screens'
import AllHousesList from './src/screens/AllHousesList'
import AddHouse from './src/screens/AddHouse'
import SingleHouse from './src/screens/SingleHouse'
import UpdateHouse from './src/screens/UpdateHouse'
import { Provider } from 'react-redux'
import store from './src/store/createStore'
import { firebase } from './src/firebase/config'


const Stack = createStackNavigator()

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
          })
          .catch((error) => {
            setLoading(false)
          });
      } else {
        setLoading(false)
      }
    });
  }, []);

  if (loading) {
    return (
      <></>
    )
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Welcome'
            component={WelcomeScreen}
            backgroundColor={colors.teal}
          />
          <Stack.Screen
            name='LogInForm'
            component={LogInForm}
            options={{ title: 'Log In Form' }}
          />
          <Stack.Screen
            name='SignUpForm'
            component={SignUpForm}
            options={{ title: 'Sign Up Form' }}
          />
          <Stack.Screen
            name='AllHousesList'
            component={AllHousesList}
            options={{ title: 'All Houses List' }}
          />
          <Stack.Screen
            name='AddHouse'
            component={AddHouse}
            options={{ title: 'Add House' }}
          />
          <Stack.Screen
            name='SingleHouse'
            component={SingleHouse}
            options={{ title: 'Single House' }}
          />
          <Stack.Screen
            name='UpdateHouse'
            component={UpdateHouse}
            options={{ title: 'Update House' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}





