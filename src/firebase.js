import firebase from 'firebase'

var config = {
  apiKey: "YOUR-API",
  authDomain: "DOMIAN",
  databaseURL: "DATABASE",
  projectId: "PROJECT-ID",
  storageBucket: "STORAGE",
  messagingSenderId: "M"
}
firebase.initializeApp(config)

let firebaseRef = firebase.database().ref()

export default firebase

export let todoRef = firebaseRef.child('todo')
