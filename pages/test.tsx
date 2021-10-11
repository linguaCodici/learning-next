import { firestore, getUserWithUsername, postsToJSON } from "../lib/firebase";
import { collection, doc, getDocs, query, where, limit } from "@firebase/firestore";
import { useEffect, useState } from "react";

export default function TestPage({}) {
  const [post, setPost] = useState(null);
  useEffect(() => {
    // You need to restrict it at some point
    // This is just dummy code and should be replaced by actual
    if (!post) {
      getPost();
    }
  }, []);
  const getPost = async () => {
    const { username, slug } = { username: "vic", slug: "hello-world" };
    const userDoc = await getUserWithUsername(username);
    console.log(userDoc.data());

    const postRef = userDoc.ref.collection("posts").doc(slug);
    const post = await postRef.get();
    console.log(post.data());
    
    // setPost(post);
  };

  // const [realtimePost] = useCollectionDatav9(
  //   "users/OVa2cSyBBIMEUOAcPnwlsBqvbEv2/posts/dHSTaCjuLQ0xxnbMKnKY"
  // );

  return <main></main>;
}
