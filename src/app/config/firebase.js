import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {

    apiKey: "AIzaSyDnLS9_t16CgHNuBw2azpeo_QKEWQqHYH4",
    authDomain: "revents-243810.firebaseapp.com",
    databaseURL: "https://revents-243810.firebaseio.com",
    projectId: "revents-243810",
    storageBucket: "revents-243810.appspot.com",
    messagingSenderId: "984985780283",
    appId: "1:984985780283:web:4b52bb3b4ad13d85e29c1e",
    measurementId: "G-D55N7DR1EQ"
}

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;