import firebase from 'firebase'
import "firebase/auth"
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyDDK4-_ZJ6pa-qMgj5wMBcM7g1rdQI5cgs",
    authDomain: "tablecis400.firebaseapp.com",
    databaseURL: "https://tablecis400-default-rtdb.firebaseio.com",
    projectId: "tablecis400",
    storageBucket: "tablecis400.appspot.com",
    messagingSenderId: "1071216020031",
    appId: "1:1071216020031:web:ed5ad08083dbe42edf468a",
    measurementId: "G-946CMWHSJL"
};

// var firebaseConfig = {
//     apiKey: "AIzaSyByxFvo-zs4UVPrdSuvzPfiLLyPAuNk_tI",
//     authDomain: "cis400-test.firebaseapp.com",
//     projectId: "cis400-test",
//     storageBucket: "cis400-test.appspot.com",
//     messagingSenderId: "265973472729",
//     appId: "1:265973472729:web:15120815f387a828f60dc8",
//     measurementId: "G-EP7BV7V380"
//   };

firebase.initializeApp(firebaseConfig)
export const auth = firebase.auth()
export const firestore = firebase.firestore()

// Sign up / Log in

export const generateUserDocument = async user => {

    if (!user) {
        console.log('generateUserDoc called but did not use firebase')
        return
    }
    console.log('generateUserDocument called and used firebase read')
    const userRef = firestore.doc(`users/${user.displayName}`)
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
        const { email, displayName } = user;
        try {
            await userRef.set({
                displayName,
                email,
                wins: 0,
                loses: 0,
                requested: [],
                pending: [],
                friends: [],
            })
        } catch (err) {
            console.error('Error creating doc', err)
        }
    }

    return getUserDoc(user.displayName)
}


export const getUserStats = async playerName => {
    if (!playerName) return
    const userDoc = await firestore.collection('users').doc(playerName).get()
    return (
        userDoc.data()
    )
}

export const didRequest = async (srcName, tgtName) => {
    const srcDoc = await firestore.collection('users').doc(srcName).get()
    return (srcDoc.data().requested.includes(tgtName))
}

export const areFriendsWith = async (srcName, tgtName) => {
    const srcDoc = await firestore.collection('users').doc(srcName).get()
    return (srcDoc.data().friends.includes(tgtName))
}

export const sendRequest = async (srcName, tgtName) => {
    const srcUserRef = firestore.collection('users').doc(srcName)
    const tgtUserRef = firestore.collection('users').doc(tgtName)

    await srcUserRef.update({ requested: firebase.firestore.FieldValue.arrayUnion(tgtName) })
    await tgtUserRef.update({ pending: firebase.firestore.FieldValue.arrayUnion(srcName) })
}

// I(src) accept friend request from tgt
export const acceptFriend = async (srcName, tgtName) => {
    const srcUserRef = firestore.collection('users').doc(srcName)
    const tgtUserRef = firestore.collection('users').doc(tgtName)

    await srcUserRef.update({ friends: firebase.firestore.FieldValue.arrayUnion(tgtName) })
    await tgtUserRef.update({ friends: firebase.firestore.FieldValue.arrayUnion(srcName) })
    await srcUserRef.update({ pending: firebase.firestore.FieldValue.arrayRemove(tgtName)})
    await tgtUserRef.update({ requested: firebase.firestore.FieldValue.arrayRemove(srcName)})
}

export const removeFriend = async (srcName, tgtName) => {
    const srcUserRef = firestore.collection('users').doc(srcName)
    const tgtUserRef = firestore.collection('users').doc(tgtName)

    await srcUserRef.update({ friends: firebase.firestore.FieldValue.arrayRemove(tgtName)})
    await srcUserRef.update({ friends: firebase.firestore.FieldValue.arrayRemove(srcName)})
}

// checks if the src (you) have a request from tgt (them) 
export const hasFriendPending = async (srcName, tgtName) => {
    console.log('hasFriendPending called')
    console.log('srcName = ' + srcName)
    const srcDoc = await firestore.collection('users').doc(srcName).get()
    console.log('srcdoc ' + srcDoc)
    console.log(srcDoc.data().pending.includes(tgtName))
    return (srcDoc.data().pending.includes(tgtName))
}


const getUserDoc = async displayName => {
    console.log('getUserDoc called')
    if (!displayName) return null
    try {
        const userDoc = await firestore.collection('users').doc(displayName).get()
        return {
            displayName,
            ...userDoc.data()

        }

    } catch (err) {
        console.error('Error fetching user', err)
    }

}






/** ANAYTICS **/



const getDate = async names => {

    var timeNow = new Date();
    var date = timeNow.toLocaleString("en-CA", {
        timeZone: "America/New_York"
    }).split(",")[0];
    var hour = timeNow.toLocaleString("en-CA", {
        hour: "2-digit",
        hour12: false,
        timeZone: "America/New_York"
    }) + ":00:00";
    if (hour === "24:00:00") { //Chrome uses 24 instead of 0 for hours
        hour = "00:00:00"
    }

    console.log(date)
    console.log(hour)

    return [date, hour]

}
export const updateAnalytics = async user => {
    console.log('updateAnalytics called')
    if (!user) return
    if (!user.type) return

    //getting hour and time used as document id
    var times = await getDate()
    let date = times[0]
    let hour = times[1]

    let type = "numConnections"

    const analyticsRef = firestore.doc("analytics/" + date + " " + hour)
    const snapshot = await analyticsRef.get();

    //creating data array to add/update database with using the passed in analytics type
    let updateArray = {}
    updateArray[user.type] = firebase.firestore.FieldValue.increment(1)

    if (!snapshot.exists) {
        firestore.doc("analytics/" + date + " " + hour).set(updateArray).catch((error) => {
            console.error("Error writing document: ", error);
        });
    } else {
        firestore.doc("analytics/" + date + " " + hour).update(updateArray).catch((error) => {
            console.error("Error writing document: ", error);
        });
    }
}



