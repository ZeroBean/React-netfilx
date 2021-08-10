import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCFvs4-aukUFiNp-V1dd6TS3vDAfWOvHRg",
    authDomain: "nefilx.firebaseapp.com",
    projectId: "nefilx",
    storageBucket: "nefilx.appspot.com",
    messagingSenderId: "756654512817",
    appId: "1:756654512817:web:f02ec0ab79c5ffbf7e2090",
    measurementId: "G-PREF40T9NC"
  };

firebase.initializeApp(firebaseConfig)
const storage = firebase.storage()
export default storage