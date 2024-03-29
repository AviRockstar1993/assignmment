import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';
import Registration from '../screens/Registration';
import HomePage from '../screens/HomePage';
import Details from '../screens/Details';
import ListScreen from '../screens/ListScreen';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="ListPage" component={ListScreen} />
        <Stack.Screen name="Home Page" component={HomePage} />
        <Stack.Screen name="Details Page" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
