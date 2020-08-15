import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyBzQnk-smBLwV2rgfUIjhHgk3rTEl-T8Nk',
    authDomain: 'housesearch-4afc8.firebaseapp.com',
    databaseURL: 'https://housesearch-4afc8.firebaseio.com',
    projectId: 'housesearch-4afc8',
    storageBucket: 'housesearch-4afc8.appspot.com',
    messagingSenderId: '930449771789',
    appId: '1:930449771789:ios:fd6fb57e5b861877887444',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };