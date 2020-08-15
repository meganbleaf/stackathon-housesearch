import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import colors from './app/config/colors'
import { WelcomeScreen, LogInForm, SignUpForm } from './src/screens'
import AllHousesList from './src/screens/AllHousesList'
import AddHouse from './src/screens/AddHouse'
import { Provider } from 'react-redux'
import store from './src/store/createStore'


const Stack = createStackNavigator()

export default function App() {


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

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}





