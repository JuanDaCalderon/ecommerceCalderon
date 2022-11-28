import { useState } from 'react'
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase/firebase';

export const useUserFirestore = () => {
    const [userId, setUserId] = useState();
    const saveUser = async (user) => {
        const docRef = await addDoc(collection(db, "users"), user);
        setUserId(docRef.id);
    };
    return { userId, saveUser };
}