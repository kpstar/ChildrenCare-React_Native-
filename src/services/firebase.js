import firebase from 'react-native-firebase';

import {
    Platform,
    AsyncStorage
} from 'react-native';

// let parentRef = firebase.database().ref('parents/');
// let childrenRef = firebase.database().ref('children/');

function pushParent(email, family_name, device_token, location) {
    let parentRef = firebase.database().ref('parents/');
    parentRef.push({email, family_name, device_token, location})
    .then((data)=>{
        console.log('Data', data);
    }).catch((error)=>{
        console.log('Error', error);
    })
}

function updateFamilyName(id, family_name) {
    let parentRef = firebase.database().ref('parents/' + id);
    parentRef.update({family_name})
    .then((data)=>{
        console.log('Data', data);
    }).catch((error)=>{
        console.log('Error', error);
    })
}

function updateParentToken(id, device_token) {
    let parentRef = firebase.database().ref('parents/' + id);
    parentRef.update({device_token})
    .then((data)=>{
        console.log('Data', data);
    }).catch((error)=>{
        console.log('Error', error);
    })
}

function updateLocation(id, location) {
    let parentRef = firebase.database().ref('parents/' + id);
    parentRef.update({location})
    .then((data)=>{
        console.log('Data', data);
    }).catch((error)=>{
        console.log('Error', error);
    })
}

function getChildren() {

}

export default {getChildren, pushParent}