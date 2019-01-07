const functions = require('firebase-functions');

const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);


exports.sendChildrenNotification = functions.database.ref('/children/{parent_id}/{children_id}/name').onUpdate((snapshot, event) => {
    const parent_id = event.params.parent_id;
    const children_id = event.params.children_id;

    console.log('Parent Id = ', parent_id);
    console.log('Children Id = ', children_id);
    // event.data.ref('news/').set({new: 'adfasdf'});
    // return true;
    return sendMessage(parent_id);
});

exports.addParent = functions.database.ref('/parents/{parent_id}/family_name').onUpdate((snapshot, event) => {
    const parent_id = event.params.parent_id;

    console.log('Parent Id = ', parent_id);
    return true;
    
    // return sendMessage(parent_id);
});

function sendMessage(parent_id){
    
    return admin.database().ref(`parents/${parent_id}`).once('value', (snapshot) => {
        var channel = snapshot.val();
        console.log("channel =", channel);
        var device_token =  channel.device_token;
        console.log("device_token =", device_token);
        var payload = {
            notification: {
                title: "Title",
                body:  "content",
                sound: "default",
            }
        };

        return admin.messaging().sendToDevice(device_token, payload)
        .then(response => {                                                                                
            console.log('This was the notification Feature');
        });

        // channel_users.forEach(function(user_id) {

        //     if (user_id == last_message.sender_id) return;

        //     return admin.database().ref(`/user_fcm_tokens/${user_id}`).once('value', (snapshot) => {

        //         var tokensObject = snapshot.val()

        //         var tokens = Object.keys(tokensObject);

        //         tokens.forEach(function(token) {

        //             var badge_number = tokensObject[token];

        //             badge_number ++;

        //             var sender_name = last_message.sender_name;
        //             var content = last_message.content;
        //             if (content == FIRST_AUTO_MESSAGE) sender_name = "Spankrr";

        //             var payload = {
        //                 notification: {
        //                     title: "From " + sender_name,
        //                     body:  content,
        //                     sound: "default",
        //                     badge: badge_number.toString()
        //                 }
        //             };

        //             admin.database().ref(`/user_fcm_tokens/${user_id}/${token}`).set(badge_number);

        //             return admin.messaging().sendToDevice(token, payload)
        //             .then(response => {                                                                                
        //                 console.log('This was the notification Feature');
        //             });
        //         });
        //     });
        // });
    });
}