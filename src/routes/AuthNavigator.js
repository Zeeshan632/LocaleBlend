import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import IntroSlider from "../screens/Auth/IntroSlider";
import Welcome from '../screens/Auth/Welcome';
import Login from "../screens/Auth/Login";
import Signup from "../screens/Auth/Signup";
import ForgetPassword from "../screens/Auth/ForgetPassword";
import EnterCode from "../screens/Auth/EnterCode";
import ResetPassword from "../screens/Auth/ResetPassword";


const Stack = createNativeStackNavigator();
const AuthNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="IntroSlider" screenOptions={{headerShown: false}}>
            <Stack.Screen name="IntroSlider" component={IntroSlider} />
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
            <Stack.Screen name="EnterCode" component={EnterCode} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
        </Stack.Navigator>
    )
}

export default AuthNavigator;