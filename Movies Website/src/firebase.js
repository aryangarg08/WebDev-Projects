import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

firebase.initializeApp(
    {
        apiKey: "AIzaSyDmgrJo2VKU0npz-c65H5L7MmPBieqUosQ",
        authDomain: "movie-app-cda37.firebaseapp.com",
        projectId: "movie-app-cda37",
        storageBucket: "movie-app-cda37.appspot.com",
        messagingSenderId: "890782724361",
        appId: "1:890782724361:web:d3182ef4dffc1cbe21e3d8"
    }
)

export const auth = firebase.auth();
const firestore = firebase.firestore();
export const database = {
    users : firestore.collection('users'),
}