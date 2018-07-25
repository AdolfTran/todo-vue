import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyCtDdflRwatzXVRKJIbUnoqGzqpnU5-0ko',
  authDomain: 'todolist-82f37.firebaseapp.com',
  databaseURL: 'https://todolist-82f37.firebaseio.com',
  projectId: 'todolist-82f37',
  storageBucket: 'todolist-82f37.appspot.com',
  messagingSenderId: '97220304896'
}
firebase.initializeApp(config)

let firebaseRef = firebase.database().ref()

export default firebase

export let todoRef = firebaseRef.child('todo')
