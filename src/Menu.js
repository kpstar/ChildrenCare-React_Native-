import React, { Component } from 'react';
import { View, StatusBar, StyleSheet, Image, Alert} from 'react-native';
import {Colors, Images, FontSizes} from './theme';
import { Container, Content, Button, Icon, Form, Item, Label, Input, Text, List, ListItem} from 'native-base';
import { strings } from './services/i18n';
import firebase from 'react-native-firebase';
import { StackActions, NavigationActions } from 'react-navigation';
import { responsiveWidth } from 'react-native-responsive-dimensions';

export default class Menu extends Component {
    goto(key){
        console.log("goto ", key)
        this.props.navigation.navigate(key)
    }
    render() {
        return (
            <Container style={styles.container}>
                <Content>
                    <View style={styles.logo}>
                        <Image 
                            source={Images.profile}
                            style={{width: 120, height: 120, resizeMode: 'cover', borderRadius: 60}}
                        />
                    </View>
                    <List style={styles.list}>
                        <ListItem onPress={()=>{this.goto('ParentInfoStack')}}>
                            <Text style={styles.listItem}>{strings('drawer_menu_home.value')}</Text>
                        </ListItem>
                        <ListItem onPress={()=>{this.goto('MapScreenStack')}}>
                            <Text style={styles.listItem}>{strings('drawer_menu_map.value')}</Text>
                        </ListItem>
                        <ListItem onPress={()=>{
                            Alert.alert(
                                strings('drawer_menu_logout_title.value'),
                                strings('drawer_menu_logout_description.value'),
                                [
                                    {text: strings('drawer_menu_logout_no.value'), onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                    {text: strings('drawer_menu_logout_yes.value'), onPress: async () => {
                                        const resetAction = StackActions.reset({
                                            index: 0,
                                            key: null,
                                            actions: [NavigationActions.navigate({ routeName: 'LogInScreen' })],
                                        });
                                        firebase.auth().signOut();
                                        this.props.navigation.dispatch(resetAction);
                                    }},
                                ],
                                { cancelable: false }
                            )
                        }}>
                            <Text style={styles.listItem}>{strings('drawer_menu_logout.value')}</Text>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Red,
    },
    logo: {
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
    },
    list: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    listItem: {
        textAlign: 'center',
        color: Colors.white,
        width: responsiveWidth(55),
        fontSize: FontSizes.medium,
    },
    listBack: {
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    logoText: {
        fontSize: 24,
        fontWeight: 'bold'
    }
})