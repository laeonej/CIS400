import firebase from 'firebase/app'
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

firebase.initializeApp(firebaseConfig)
export const auth = firebase.auth()
export const firestore = firebase.firestore()

export const generateUserDocument = async user => {
    if (!user) return
    const userRef = firestore.doc(`users/${user.displayName}`)
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
        const { email, displayName } = user;
        try {
            await userRef.set({
                displayName,
                email,
                wins: 0,
                loses: 0
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
    if (!srcName || !tgtName) return false
}

const sendRequest = async (srcName, tgtName) => {
    const userRef = firestore.collection('users').doc(srcName)

    await userRef.update({ requested: firestore.arrayUnion(tgtName) })

}

const getUserDoc = async displayName => {
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
    if (hour == "24:00:00") { //Chrome uses 24 instead of 0 for hours
        hour = "00:00:00"
    }

    console.log(date)
    console.log(hour)

    return [date, hour]

}
export const updateAnalytics = async user => {
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



