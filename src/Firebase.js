import firebase from 'firebase';

const config = {
  apiKey: "xxxxxxxxxxx",
  databaseURL: "https://fir-gary.firebaseio.com",
  projectId: "fir-gary"
};
firebase.initializeApp(config);

const firebase_root = firebase.database();
export default firebase_root;