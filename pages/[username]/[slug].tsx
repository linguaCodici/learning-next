import {
  getUserWithUsername,
  firestore,
  postsToJSON,
} from "../../lib/firebase";
import PostContent from "../../components/PostContent";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Metatags from "../../components/Metatags";
import AuthCheck from "../../components/AuthCheck";
import HeartButton from "../../components/HeartButton";
import Link from 'next/link';

import styles from "../../styles/Post.module.css";

export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);

  let post;
  let path;

  if (userDoc) {
    const postsRef = userDoc.ref.collection("posts");
    const postRef = postsRef.doc(slug);

    post = postsToJSON(await postRef.get());
    
    path = postRef.path;
  
  }

  return {
    props: { post, path },
    revalidate: 5000,
  };
}

export async function getStaticPaths() {
  const snapshot = await firestore.collectionGroup("posts").get();

  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    
    return {
      params: { username, slug },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
}

export default function Post(props) {
  const postRef = firestore.doc(props.path);
  const [realtimePost] = useDocumentData(postRef);
  const post = realtimePost || props.post;

  return (
    <main className={styles.container}>
      <Metatags title={post.title} author={post.username}/>
      <section>
        <PostContent post={post} />
      </section>

      <aside className="card">
        <p>
          <strong>{post.heartCount || 0} hearts</strong>
        </p>

        <AuthCheck
          fallback={
            <Link href="/enter">
              <button>Sign Up</button>
            </Link>
          }
        >
          <HeartButton postRef={postRef}/>
        </AuthCheck>
      </aside>
    </main>
  );
}
