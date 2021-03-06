import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBRx8zX9ko5tkFr0nUoHwSeXvd7_sub-LU",
    authDomain: "crown-db-efb17.firebaseapp.com",
    databaseURL: "https://crown-db-efb17.firebaseio.com",
    projectId: "crown-db-efb17",
    storageBucket: "crown-db-efb17.appspot.com",
    messagingSenderId: "949637325127",
    appId: "1:949637325127:web:3bb56e768578a68456ac62",
    measurementId: "G-S9Q6P4Y42Z"
  };

export const createUserProfileDocument = async(userAuth, additionalData) => {
    if(!userAuth)return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch(error){
            console.log('error creating user', error.message);
        }

    }
    return userRef;
}  

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);


  export default firebase;