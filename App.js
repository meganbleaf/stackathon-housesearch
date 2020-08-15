import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import colors from './app/config/colors'

import WelcomeScreen from './app/screens/WelcomeScreen';
import LogInForm from './app/screens/LogInForm'
import SignUpForm from './app/screens/SignUpForm'

const Stack = createStackNavigator()

export default function App() {

  return (
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
