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


const provider = new firebase.auth.GoogleAuthProvider()

export const signInWithGoogle = () => {
    auth.signInWithPopup(provider)
}

export const generateUserDocument = async user => {
    if (!user) return
    const userRef = firestore.doc(`users/${user.uid}`)
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
        const { email, displayName } = user;
        try {
            await userRef.set({
                displayName,
                email
            })
        } catch (err) {
            console.error('Error creating doc', err)
        }
    }

    return getUserDoc(user.uid)
}



const getUserDoc = async uid => {
    if (!uid) return null
    try {
        const userDoc = await firestore.collection('users').doc(uid).get()
        return {
            uid,
            ...userDoc.data()
        }

    } catch (err) {
        console.error('Error fetching user', err)
    }
    
}