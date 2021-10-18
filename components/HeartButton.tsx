import { useDocument } from "react-firebase-hooks/firestore";
import { auth, firestore, increment } from "../lib/firebase";

export default function HeartButton({ postRef }) {
  const heartRef = postRef.collection('hearts').doc(auth.currentUser.uid);
  const [heartDoc] = useDocument(heartRef);

  const addHeart = async () => {
    const uid = auth.currentUser.uid;
    const batch = firestore.batch();

    batch.set(heartRef, { uid });
    batch.update(postRef, { heartCount: increment(1) });

    await batch.commit();
  }

  const removeHeart = async () => {
    const uid = auth.currentUser.uid;
    const batch = firestore.batch();

    batch.delete(heartRef);
    batch.update(postRef, { heartCount: increment(-1) });

    await batch.commit();
  };

  return heartDoc?.exists ? (
    <button onClick={removeHeart}>Unlike</button>
  ) : (
    <button onClick={addHeart}>Like</button>
  );
}