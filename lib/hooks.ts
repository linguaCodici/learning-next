import { auth, firestore } from '../lib/firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react'
import { collection, doc, getDoc, onSnapshot } from '@firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore';

export function useUserData() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    let unsubscribe;

    if (user) {
      const ref = collection(firestore, 'users');
      const documentRef = doc(ref, user.uid);
      // console.log(`user uid: ${user.uid} ref: ${JSON.stringify(documentRef)}`);

      const query = getDoc(documentRef);

      unsubscribe = query.then( (querySnapshot) => {
        setUsername(querySnapshot.data()?.username);
        // console.log(`Retrieved data: ${JSON.stringify(querySnapshot.data())}`);
      });

    } else {
      setUsername(null);
    }

    return unsubscribe;
  }, [user]);

  return { user, username }; 
}