import { firestore, getUserWithUsername, postsToJSON } from "../lib/firebase";
import { collection, doc, getDocs, query, where, limit } from "@firebase/firestore";
import { useEffect, useState } from "react";

export default function TestPage({}) {
  // const [post, setPost] = useState(null);
  // useEffect(() => {
  //   // You need to restrict it at some point
  //   // This is just dummy code and should be replaced by actual
  //   if (!post) {
  //     getPost();
  //   }
  // }, []);
  // const getPost = async () => {
  //   const { username, id } = { username: "vic", id: "hello-world" };
  //   const userDoc = await getUserWithUsername(username);
  //   console.log(userDoc.data());

  //   const postsRef = collection(userDoc.ref, "posts");
  //   const postQuery = query(postsRef, where("slug", "==", id), limit(1));

  //   const posts = await getDocs(postQuery);
  //   console.log(posts.docs[0].ref.path);
  //   const post = postsToJSON(posts.docs[0]);
    
  //   setPost(post);
  // };

  // const [realtimePost] = useCollectionDatav9(
  //   "users/OVa2cSyBBIMEUOAcPnwlsBqvbEv2/posts/dHSTaCjuLQ0xxnbMKnKY"
  // );

  return <main></main>;
}
