import * as firebase from 'firebase';

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const database = firebase.database();
const firebaseStorage = firebase.storage();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const firebaseMatches = database.ref('matches');
const firebasePromotions = database.ref('promotions');
const firebaseTeams = database.ref('teams');
const firebasePlayers = database.ref('players');

export { 
  firebaseMatches, 
  firebasePromotions, 
  firebaseTeams, 
  firebasePlayers,
  firebase,
  firebaseStorage,
   googleAuthProvider, 
  database as default };
