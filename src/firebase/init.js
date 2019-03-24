import firebase from 'firebase/app'
import 'firebase/firestore'

// Initialize Firebase
var config = {
    
  };
  const firebaseApp = firebase.initializeApp(config);
  // firebaseApp.firestore().settings({ timestampsInSnapshots: true })

  // export firestore database
  export default firebaseApp.firestore()

  
