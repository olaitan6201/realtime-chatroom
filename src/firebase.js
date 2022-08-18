import { initializeApp } from "firebase/app";
import "firebase/auth"
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import "firebase/firestore"
import { addDoc, collection, getDocs, getFirestore, orderBy, query } from "firebase/firestore";

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
    }
}

export const authStateChanged = () => onAuthStateChanged(auth, (user) => {
    if (user) return user;
    return null;
});


export const getChats = async () => {
  const chatsRef = collection(db, "chats");
  // const chats = collectionData(query, "id").pipe(startWith([]));
  // return chats;
  
  const q = query(chatsRef, orderBy("sentAt", "asc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => doc.data());
}


export const sendMessage = async (user, message) => {
  console.log(user);
  try {
    const docRef = await addDoc(collection(db, "chats"), {
      uid: user.uid,
      message: message,
      avatar: user.photoURL,
      sentAt: new Date()
    });
  
    console.log("Document written with ID: ", docRef.id);

    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
}