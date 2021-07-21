import { boot } from 'quasar/wrappers'

import firebase from 'firebase/app'
import 'firebase/auth'

import 'firebase/firestore'
var firebaseConfig = {
  apiKey: "AIzaSyDPL4BxW6dZtfYDAN0BUGa_2ixhNfQJDII",
  authDomain: "quasar-firechat-1653e.firebaseapp.com",
  projectId: "quasar-firechat-1653e",
  storageBucket: "quasar-firechat-1653e.appspot.com",
  messagingSenderId: "887258199403",
  appId: "1:887258199403:web:4be0d419ad3498b21a482e"
};
firebase.initializeApp(firebaseConfig);

const db =  firebase.firestore();
const auth =  firebase.auth();
const marcaTiempo =  firebase.firestore.FieldValue.serverTimestamp;

export {db, auth, marcaTiempo};
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  // something to do
})
