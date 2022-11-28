import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAicKIcxnZdXZks2ZlsVpqQeNTBhcHBefI",
    authDomain: "ecommerceprojectcoderhouse.firebaseapp.com",
    projectId: "ecommerceprojectcoderhouse",
    storageBucket: "ecommerceprojectcoderhouse.appspot.com",
    messagingSenderId: "989563528158",
    appId: "1:989563528158:web:22b4711a546d0f200bf34f"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);