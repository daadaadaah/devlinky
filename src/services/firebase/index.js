import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';

import config from './config';

firebase.initializeApp(config);

const githubAuthProvider = new firebase.auth.GithubAuthProvider();
const githubOAuthLogin = () => firebase.auth().signInWithPopup(githubAuthProvider);

export {
  firebase, githubAuthProvider, githubOAuthLogin,
};
