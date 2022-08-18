import { initializeApp } from "firebase/app";
import "firebase/auth"
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import "firebase/firestore"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDqaNToLTGvxqZCN_9BjxdrRKPJXKX3OEU",
  authDomain: "realtime-chat-e8037.firebaseapp.com",
  projectId: "realtime-chat-e8037",
  storageBucket: "realtime-chat-e8037.appspot.com",
  messagingSenderId: "651229944371",
  appId: "1:651229944371:web:b0748a8985c79ba4b42146"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
// export const googleProvicer = new auth.GoogleAuthProvider();
export const db = getFirestore(app);

export const signInWithGoogle = async () => {
    try {
        let result = await signInWithPopup(auth, provider);
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
          // The signed-in user info.
        const user = result.user;
        return user;
    } catch (error) {
        console.log(error);
        return null;
        // // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.customData.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    }
}

export const authStateChanged = onAuthStateChanged(auth, (user) => {
    if (user) return user.uid;
    return null;
});