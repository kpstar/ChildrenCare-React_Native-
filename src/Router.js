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
// import PhoneNumber from "./screens/VerificationScreen/PhoneNumber"
import QRCodeScanner from "./screens/QRScreen/QRCodeScanner"
import EmailScreen from "./screens/LoginScreen/EmailLoginScreen"
import ChildrenInfo from "./screens/RegisterScreen/ChildrenInfo"
import ParentInfo from "./screens/RegisterScreen/ParentInfo"
import MapScreen from "./screens/MainScreen/MapScreen"
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

export const ChildInfoStack = createStackNavigator({
    MapScreen: { 
        screen: ChildrenInfo, 
        navigationOptions: ({ navigation }) => ({
            headerStyle: headerStyle,
            headerLeft: <MenuIcon {...navigation} />,
            headerRight: <EmptyIcon/>
        }),
    },
});

export const DrawerStack = createDrawerNavigator(
    {
        ParentInfoStack: {screen: ParentInfoStack},
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
        ChildInfoStack: {screen: ChildInfoStack},
        MapScreenStack: {screen: MapScreenStack},
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
    // PhoneScreen: {screen: PhoneNumber},
    EmailLoginScreen: {screen: EmailScreen},
    QRCodeScanScreen: {screen: QRCodeScanner},
    ChildDrawerStack: {screen: ChildDrawerStack},
    DrawerStack: {screen: DrawerStack},
    QRCodeGenScreen: {screen: QRCodeGenerator},

    // ChildrenQRScreen: {screen: ChildrenQR},
}, {
    navigationOptions: {
        gesturesEnabled: false,
    },
    headerMode: 'none',
})