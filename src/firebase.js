import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAwFc5GHvBXA1xVW94J0o0rdwRQ4od4Zp0",
    authDomain: "trello-db3c7.firebaseapp.com",
    projectId: "trello-db3c7",
    storageBucket: "trello-db3c7.appspot.com",
    messagingSenderId: "321352036660",
    appId: "1:321352036660:web:c722eb230e8a821fabb561",
    measurementId: "G-GTZQLJNWE7"  
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
 
  export default db;