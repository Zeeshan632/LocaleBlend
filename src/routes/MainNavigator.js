import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import images from "../assets/images";
import colors from "../theme/colors";

import Feed from "../screens/Main/Feed";
import Chats from "../screens/Main/Chats";
import WritePost from "../screens/Main/WritePost";
import Profile from "../screens/Main/Profile";
import Notification from "../screens/Main/Notification";
import UserProfile from "../screens/Main/UserProfile";
import Reactions from "../screens/Main/Reactions";
import Comments from "../screens/Main/Comments";
import ChatScreen from "../screens/Main/ChatScreen";
import CreateNew from "../screens/Main/CreateNew";
import CapturedImage from "../screens/Main/CapturedImage";
import Shop from "../screens/Main/Shop";
import SetupYourShop from "../screens/Main/SetupYourShop";
import AddFirstProduct from "../screens/Main/AddFirstProduct";
import ReviewAddedProduct from "../screens/Main/ReviewAddedProduct";
import MyProducts from "../screens/Main/MyProducts";
import ProductsOfShop from "../screens/Main/ProductsOfShop"
import VideoPlayer from "../screens/Main/VideoPlayer";
import EditProfile from "../screens/Main/EditProfile";
import Matches from "../screens/Main/Matches";
import AccountSettings from "../screens/Main/AccountSettings";
import OtherUserProfile from "../screens/Main/OtherUserProfile";
import SearchingScreen from '../screens/Main/SearchingScreen';
import ProductDetails from '../screens/Main/ProductDetails';
import PaymentScreen from "../screens/Main/PaymentScreen";
// import AddProduct from "../screens/Main/AddProduct";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const ProfileTab = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Profile" >
            <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
    )
}

const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{tabBarHideOnKeyboard: true}} >
            <Tab.Screen name="Feed"  component={Feed} options={{
                headerShown: false,
                tabBarLabelStyle: {display: "none"},
                tabBarStyle: {height: 65},
                tabBarIcon: ({focused}) => {
                    return <Image source={images.homeTab} style={focused ? {tintColor: colors.themeColorOrange} : {tintColor: 'grey'}} />
                }
            }} />
            <Tab.Screen name="Chats" component={Chats} options={{
                headerShown: false,
                tabBarLabelStyle: {display: "none"},
                tabBarStyle: {height: 65},
                tabBarIcon: ({focused}) => {
                    return <Image source={images.messageTab} style={focused ? {tintColor: colors.themeColorOrange} : {tintColor: 'grey'}} />
                }
            }}/>
            <Tab.Screen name="CreateNew" component={CreateNew} options={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarLabelStyle: {display: "none"},
                tabBarStyle: {height: 65},
                tabBarIcon: ({focused}) => {
                    return (
                        <View style={[styles.writeTab, focused ? {backgroundColor: colors.themeColorOrange, borderColor: colors.themeColorOrange} : {backgroundColor: 'white',borderColor: 'lightgrey', borderWidth: 1}]}>
                            <Image source={images.postTab} style={focused ? {tintColor: 'white'} : {tintColor: 'grey'}}  />
                        </View>
                    )
                }
            }}/>
            <Tab.Screen name="Notification" component={Notification} options={{
                headerShown: false,
                tabBarLabelStyle: {display: "none"},
                tabBarStyle: {height: 65},
                tabBarIcon: ({focused}) => {
                    return <Image source={images.notificationTab} style={focused ? {tintColor: colors.themeColorOrange} : {tintColor: 'grey'}} />
                }
            }}/>
            <Tab.Screen name="ProfileTab" component={ProfileTab} options={{
                headerShown: false,
                tabBarLabelStyle: {display: "none"},
                tabBarStyle: {height: 65},
                tabBarIcon: ({focused}) => {
                    return <Image source={images.profileTab} style={focused ? {tintColor: colors.themeColorOrange} : {tintColor: 'grey'}} />
                }
            }}/>
        </Tab.Navigator>
    )
}

const MainNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            <Stack.Screen name="Reactions" component={Reactions} />
            <Stack.Screen name="Comments" component={Comments} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} />
            <Stack.Screen name="WritePost" component={WritePost} />
            <Stack.Screen name="CapturedImage" component={CapturedImage} />
            <Stack.Screen name="UserProfile" component={UserProfile} />
            <Stack.Screen name="Shop" component={Shop} />
            <Stack.Screen name="SetupYourShop" component={SetupYourShop} />
            <Stack.Screen name="AddFirstProduct" component={AddFirstProduct} />
            <Stack.Screen name="ReviewAddedProduct" component={ReviewAddedProduct} />
            <Stack.Screen name="MyProducts" component={MyProducts} />
            <Stack.Screen name="ProductsOfShop" component={ProductsOfShop} />
            <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="Matches" component={Matches} />
            <Stack.Screen name="AccountSettings" component={AccountSettings} />
            <Stack.Screen name="OtherUserProfile" component={OtherUserProfile} />
            <Stack.Screen name="SearchingScreen" component={SearchingScreen} />
            <Stack.Screen name="ProductDetails" component={ProductDetails} />
            <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
            {/* <Stack.Screen name="AddProduct" component={AddProduct} /> */}
        </Stack.Navigator>
    )
}

export default MainNavigator;

const styles = StyleSheet.create({
    writeTab: {
        backgroundColor: colors.themeColorOrange,
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: -40
    }
})