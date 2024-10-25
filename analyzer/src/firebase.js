import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBcPHuXExWZJL6ELgwQBSrhFMQRmni9N6Y",
    authDomain: "tokenview-e1efa.firebaseapp.com",
    projectId: "tokenview-e1efa",
    storageBucket: "tokenview-e1efa.appspot.com",
    messagingSenderId: "600669925132",
    appId: "1:600669925132:web:cef4ea42f7b35abe03a329",
    measurementId: "G-14Z2M6Y7FZ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);