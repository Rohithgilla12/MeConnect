import * as firebase from 'firebase';
import 'firebase/firestore';

const settings = {timestampsInSnapshots: true};
const config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
  };
  firebase.initializeApp(config);
  
export const f = firebase;
export const auth = firebase.auth();
export const storage = firebase.storage();
export const db = firebase.firestore();
export const database = firebase.database();
