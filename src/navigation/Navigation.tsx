import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Registration from '../screens/Registration';
import HomePage from '../screens/HomePage';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="Registration Page"
          component={Registration}
        />
        <Stack.Screen
          name="Home Page"
          component={HomePage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation;