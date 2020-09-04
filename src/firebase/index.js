import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";
import "firebase/auth";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCVO66kd-9OGUbCZOQtIffQEG6uqEbjfTE",
  authDomain: "beyondschool-6fffa.firebaseapp.com",
  databaseURL: "https://beyondschool-6fffa.firebaseio.com",
  projectId: "beyondschool-6fffa",
  storageBucket: "beyondschool-6fffa.appspot.com",
  messagingSenderId: "201058008982",
  appId: "1:201058008982:web:985820a1c2d0ff95c967b7",
};
// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default function setFirebase(Vue) {
  Object.defineProperty(Vue.prototype, "$firebase", {
    get() {
      return firebaseApp;
    },
  });
}
