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
    if(!playerName) return
    const userDoc = await firestore.collection('users').doc(playerName).get()
    return(
        userDoc.data()
    )
}

export const didRequest = async (srcName, tgtName) => {
    if(!srcName || !tgtName) return false
}

const sendRequest = async (srcName, tgtName) => {
    const userRef = firestore.collection('users').doc(srcName)

    await userRef.update({requested: firestore.arrayUnion(tgtName)})

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

