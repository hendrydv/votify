import { initializeApp } from "firebase/app";
import {getDatabase, ref as dbRef, set, onValue} from "firebase/database";

const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;

const firebaseConfig = {
    apiKey: apiKey,
    authDomain: "votify-2a038.firebaseapp.com",
    databaseURL: "https://votify-2a038-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "votify-2a038",
    storageBucket: "votify-2a038.firebasestorage.app",
    messagingSenderId: "920987572511",
    appId: "1:920987572511:web:777d5c13100dc0b7de382a",
    measurementId: "G-EY6RTTGBDX"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export const insert = (path, data) => {
    return set(dbRef(db, path), data);
}

export const get = (path, callBack) => {
    const getRef = dbRef(db, path);
    return onValue(getRef, callBack);
}