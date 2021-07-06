import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';

import config from './config';

firebase.initializeApp(config);

const githubAuthProvider = new firebase.auth.GithubAuthProvider();
const githubOAuthLogin = () => firebase.auth().signInWithPopup(githubAuthProvider);

const db = firebase.firestore();

const getUser = async (firebaseUid) => {
  const responses = await db.collection('user').where('uid', '==', firebaseUid).get();

  return responses.docs.map((doc) => (doc.data()))[0];
};

const addUser = async ({ firebaseUid, githubId, githubProfile }) => {
  await db.collection('user').doc(firebaseUid).set({
    githubId,
    githubProfile,
  });

  return { uid: firebaseUid, githubId, githubProfile };
};

export {
  firebase,
  githubAuthProvider,
  githubOAuthLogin,
  getUser,
  addUser,
};
