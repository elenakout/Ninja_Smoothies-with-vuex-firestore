import firebase from 'firebase/app'
import 'firebase/firestore'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDxvDDUvKAZ5maZhewnot-3uXHKqttN6Eg",
    authDomain: "freshstart-389c1.firebaseapp.com",
    databaseURL: "https://freshstart-389c1.firebaseio.com",
    projectId: "freshstart-389c1",
    storageBucket: "freshstart-389c1.appspot.com",
    messagingSenderId: "617707150001"
  };
  const firebaseApp = firebase.initializeApp(config);
  

  // export firestore database
  export default firebaseApp.firestore()

  