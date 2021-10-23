
import { createStore, combineReducers, compose } from 'redux'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore' // <- needed if using firestore
import { reduxFirestore, firestoreReducer } from 'redux-firestore' // <- needed if using firestore

const firebaseConfig = {
    apiKey: "AIzaSyBsDD0qSl6odffOSR8msoKwxG615vmwCnc",
    authDomain: "my-cart-40ad9.firebaseapp.com",
    databaseURL: "https://my-cart-40ad9.firebaseio.com",
    projectId: "my-cart-40ad9",
    storageBucket: "my-cart-40ad9.appspot.com",
    messagingSenderId: "1065079046063",
    appId: "1:1065079046063:web:59e218aa8a59e9f8"
}

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true
}

// Initialize firebase instance
firebase.initializeApp(firebaseConfig)

// Init firestore
const firestore = firebase.firestore() // <- needed if using firestore

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
    reduxFirestore(firebase) // <- needed if using firestore
)(createStore)

// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer
})

// Create store with reducers and initial state
const initialState = {}
const store = createStoreWithFirebase(rootReducer, initialState, compose(reactReduxFirebase(firebase), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;