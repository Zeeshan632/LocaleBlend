import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator'


const Stack = createNativeStackNavigator();

const Routes = () => {
  const {userLoggedIn} = useSelector(state => state.authData)
  const {data} = useSelector(state => state.authData)
  
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {
              userLoggedIn ? (
                <Stack.Screen name="MainNavigator" component={MainNavigator} />
              ) : (
                <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
              )
            }
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes