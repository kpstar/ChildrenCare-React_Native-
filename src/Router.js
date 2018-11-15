/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import { StackNavigator } from 'react-navigation';

import LogIn from "./screens/LogIn"
import Splash from "./screens/Splash"
import Parent from "./screens/LoginScreen/Parent"
// import Children from "./screens/LoginScreen/Children"
// import PhoneNumber from "./screens/VerificationScreen/PhoneNumber"
// import EmailScreen from "./screens/VerificationScreen/EmailVerification"
// import ChildrenInfo from "./screens/InfoScreen/ChildrenInfo"
// import ParentInfo from "./screens/InfoScreen/ParentInfo"
// import MapScreen from "./screens/MainScreen/MapScreen"
// import ParentQRCode from "./screens/InfoScreen/ParentQRCode"
// import ChildrenQR from "./screens/InfoScreen/ChildrenQR"

export const PrimaryNav = StackNavigator({
    
    SplashScreen: {screen: Splash},
    LogInScreen: {screen: LogIn},
    ParentLoginScreen: {screen: Parent},
    // ChildrenLoginScreen: {screen: Children},
    // PhoneScreen: {screen: PhoneNumber},
    // EmailScreen: {screen: EmailScreen},
    // ChildInfoScreen: {screen: ChildrenInfo},
    // ParentInfoScreen: {screen: ParentInfo},
    // MapScreen: {screen: MapScreen},
    // ParentQRScreen: {screen: ParentQRCode},
    // ChildrenQRScreen: {screen: ChildrenQR},
}, {
    headerMode: 'none',
})