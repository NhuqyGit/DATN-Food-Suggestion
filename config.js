import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAj_rIl2MpNv2BEPnS0fgjbMuxUbEHWVg0',
  authDomain: 'foodsuggestion-8b244.firebaseapp.com',
  projectId: 'foodsuggestion-8b244',
  storageBucket: 'foodsuggestion-8b244.appspot.com',
  messagingSenderId: '1005795709817',
  appId: '1:1005795709817:web:a7c3938c248c1dc4ead5a8',
  measurementId: 'G-29FLQPCZZK',
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export { firebase }

