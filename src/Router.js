/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity, View, } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import Menu from "./Menu";
import ChildMenu from "./ChildMenu";
import {Colors, Images} from './theme';

const { width } = Dimensions.get('window');

import LogIn from "./screens/LogIn"
import Splash from "./screens/Splash"
import Parent from "./screens/LoginScreen/Parent"
import Children from "./screens/LoginScreen/Children"
import QRCodeScanner from "./screens/QRScreen/QRCodeScanner"
import QRCodeDecoder from "./screens/QRScreen/QRCodeDecoder"
import EmailScreen from "./screens/LoginScreen/EmailLoginScreen"
import PhoneScreen from "./screens/LoginScreen/PhoneLoginScreen"
import PhoneVerification from "./screens/LoginScreen/PhoneVerification"
import ChildrenInfo from "./screens/RegisterScreen/ChildrenInfo"
import ParentInfo from "./screens/RegisterScreen/ParentInfo"
import MapScreen from "./screens/MainScreen/MapScreen"
import ChildMapScreen from "./screens/MainScreen/ChildMapScreen"
import EmergencyScreen from "./screens/MainScreen/Emergency"
import QRCodeGenerator from "./screens/QRScreen/QRCodeGenerator"
// import ChildrenQR from "./screens/InfoScreen/ChildrenQR"

const headerStyle = { 
    backgroundColor: Colors.Red,
    shadowRadius: 0,
    borderBottomWidth: 0,
    shadowOffset: {
        height: 0,
    },
    shadowColor: Colors.Red,
    height: 50, 
}

const MenuIcon = ({ openDrawer }) => {
    return (
        <TouchableOpacity
            onPress={() => openDrawer()}
        >
            <Icon name="bars" size={32} color={Colors.white} style={{marginLeft: 10}}/>
        </TouchableOpacity>
    );
}

const EmptyIcon = ({ navigate }) => {
    return (
        <View style={{width: 32, height: 32}}/>
    );
}

export const ParentInfoStack = createStackNavigator({
    ParentInfoScreen: { 
        screen: ParentInfo, 
        navigationOptions: ({ navigation }) => ({
            headerStyle: headerStyle,
            headerLeft: <MenuIcon {...navigation} />,
            headerRight: <EmptyIcon/>
        }),
    },
});

export const MapScreenStack = createStackNavigator({
    MapScreen: { 
        screen: MapScreen, 
        navigationOptions: ({ navigation }) => ({
            headerStyle: headerStyle,
            headerLeft: <MenuIcon {...navigation} />,
            headerRight: <EmptyIcon/>
        }),
    },
});

export const ChildMapScreenStack = createStackNavigator({
    ChildMapScreen: { 
        screen: ChildMapScreen, 
        navigationOptions: ({ navigation }) => ({
            headerStyle: headerStyle,
            headerLeft: <MenuIcon {...navigation} />,
            headerRight: <EmptyIcon/>
        }),
    },
});

export const EmergencyScreenStack = createStackNavigator({
    EmergencyScreen: { 
        screen: EmergencyScreen, 
        navigationOptions: ({ navigation }) => ({
            headerStyle: headerStyle,
            headerLeft: <MenuIcon {...navigation} />,
            headerRight: <EmptyIcon/>
        }),
    },
});

export const ChildrenInfoStack = createStackNavigator({
    ChildrenInfo: { 
        screen: ChildrenInfo, 
        navigationOptions: ({ navigation }) => ({
            headerStyle: headerStyle,
            headerLeft: <MenuIcon {...navigation} />,
            headerRight: <EmptyIcon/>
        }),
    },
});

export const ParentDrawerStack = createDrawerNavigator(
    {
        ParentInfoStack: {screen: ParentInfoStack},
        ChildrenInfoStack: {screen: ChildrenInfo},
        MapScreenStack: {screen: MapScreenStack},
    },
    {
        drawerWidth: width * 2 / 3,
        drawerPosition: 'left',
        contentComponent: props => <Menu {...props} />
    }
);

export const ChildDrawerStack = createDrawerNavigator(
    {
        ChildMapScreen: {screen: ChildMapScreenStack},
        EmergencyScreenStack: {screen: EmergencyScreen},
    },
    {
        drawerWidth: width * 2 / 3,
        drawerPosition: 'left',
        contentComponent: props => <ChildMenu {...props} />
    }
);

export const PrimaryNav = createStackNavigator({
    
    SplashScreen: {screen: Splash},
    LogInScreen: {screen: LogIn},
    ParentLoginScreen: {screen: Parent},
    ChildrenLoginScreen: {screen: Children},
    PhoneLoginScreen: {screen: PhoneScreen},
    QRCodeDecoder: {screen: QRCodeDecoder},
    PhoneVerificationScreen: {screen: PhoneVerification},
    EmailLoginScreen: {screen: EmailScreen},
    QRCodeScanScreen: {screen: QRCodeScanner},
    ChildDrawerStack: {screen: ChildDrawerStack},
    ParentDrawerStack: {screen: ParentDrawerStack},
    QRCodeGenScreen: {screen: QRCodeGenerator},
}, {
    navigationOptions: {
        gesturesEnabled: false,
    },
    headerMode: 'none',
})