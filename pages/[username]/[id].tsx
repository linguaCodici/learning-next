import {
  getUserWithUsername,
  firestore,
  postsToJSON,
} from "../../lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  collectionGroup,
  query,
  where,
  limit,
} from "@firebase/firestore";
import PostContent from "../../components/PostContent";
import { useCollectionData, useDocumentData } from "react-firebase-hooks/firestore";

export async function getStaticProps({ params }) {
  const { username, id } = { username: "vic", id: "hello-world" };
  const userDoc = await getUserWithUsername(username);

  let post;
  let path;

  if (userDoc) {
    const postsRef = collection(userDoc.ref, "posts");
    const postQuery = query(
      postsRef,
      where("slug", "==", id),
      limit(1)
    );

    const postSnapshot = (await getDocs(postQuery)).docs[0];
    post = postsToJSON(postSnapshot)
    console.log(post);
    
    path = postSnapshot.ref.path;
  
  }

  return {
    props: { post, path },
    revalidate: 5000,
  };
}

export async function getStaticPaths() {
  const snapshot = await getDocs(collectionGroup(firestore, "posts"));

  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    console.log({ slug, username });
    
    return {
      params: { username, id: slug },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
}

export default function Post(props) {
  const postRef = doc(firestore, props.path);
  const [realtimePost] = useCollectionData(postRef);
  const post = realtimePost || props.post;

  return (
    // <main className={styles.container}>
    <main>
      <section>
        <PostContent post={post} />
      </section>

      <aside className="card">
        <p>
          <strong>{post.heartCount || 0} hearts</strong>
        </p>
      </aside>
    </main>
  );
}
