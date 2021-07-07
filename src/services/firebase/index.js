import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';

import config from './config';

firebase.initializeApp(config);

const githubAuthProvider = new firebase.auth.GithubAuthProvider();
const githubOAuthLogin = () => firebase.auth().signInWithPopup(githubAuthProvider);

const db = firebase.firestore();

const version = 'V2';

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

const getDevlink = async ({ url }) => {
  const responses = await db.collection(`devlink${version}`).where('url', '==', url).get();

  return responses.docs.map((doc) => (doc.data()))[0];
};

const addNewDevlink = async (devlink) => {
  const newDevlink = {
    ...devlink,
    createdAt: new Date().toISOString(),
    updatedAt: null,
    deletedAt: null,
  };

  const doc = await db.collection(`devlink${version}`).add(newDevlink);

  const resNewDevLink = newDevlink;
  resNewDevLink.uid = doc.id;

  return resNewDevLink;
};

const addMyDevlink = async ({ userId, devlinkId }) => {
  const newMyDevlink = {
    userUid: userId,
    devlinkId,
    createdAt: new Date().toISOString(),
    updatedAt: null,
    deletedAt: null,
  };

  const doc = await db.collection(`mydevlink${version}`).add(newMyDevlink);

  return doc;
};

export {
  firebase,
  githubAuthProvider,
  githubOAuthLogin,
  getUser,
  addUser,
  getDevlink,
  addNewDevlink,
  addMyDevlink,
};
