import * as firebase from 'firebase';
import 'firebase/firestore';

const settings = {timestampsInSnapshots: true};
const config = {
    apiKey: "AIzaSyAt1sfedPLvKa8NHSkwuVrNYMFwi5RYGUM",
    authDomain: "pokemon-1524856159085.firebaseapp.com",
    databaseURL: "https://pokemon-1524856159085.firebaseio.com",
    projectId: "pokemon-1524856159085",
    storageBucket: "pokemon-1524856159085.appspot.com",
    messagingSenderId: "166053992110"
  };
  firebase.initializeApp(config);

export const f = firebase;
export const auth = firebase.auth();
export const storage = firebase.storage();
export const db = firebase.firestore();

