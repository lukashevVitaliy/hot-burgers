import ReBase from "re-base";
import firebase from "firebase/app";
import 'firebase/database';
import 'firebase/auth';

const firebaseApp = firebase.initializeApp({
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
})

const base = ReBase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
