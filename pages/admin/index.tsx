import { useRouter } from "next/dist/client/router";
import { useContext, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import AuthCheck from "../../components/AuthCheck";
import PostFeed from "../../components/PostFeed";
import { UserContext } from "../../lib/context";
import { auth, firestore, serverTimeStamp } from "../../lib/firebase";
import kebabCase from "lodash.kebabcase";
import toast from "react-hot-toast";

export default function AdminPostsPage({}) {
  return (
    <main>
      <AuthCheck>
        <PostList />
        <CreateNewPost />
      </AuthCheck>
    </main>
  );
}

function PostList() {
  const postsRef = firestore
    .collection("users")
    .doc(auth.currentUser.uid)
    .collection("posts");
  const postsQuery = postsRef.orderBy("createdAt");
  const [querySnapshot] = useCollection(postsQuery);

  const posts = querySnapshot?.docs.map((doc) => doc.data());

  return (
    <>
      <h1>Manage your Posts</h1>
      <PostFeed posts={posts} admin></PostFeed>
    </>
  );
}

function CreateNewPost() {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState("");

  const slug = encodeURI(kebabCase(title));

  const isValid = title.length > 3 && title.length < 100;

  const createPost = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    const postRef = firestore.collection('users').doc(uid).collection('posts').doc(slug);

    const postData = {
      title,
      slug,
      uid,
      username,
      published: false,
      content: '# hello world!',
      createdAt: serverTimeStamp(),
      updatedAt: serverTimeStamp(),
      heartCount: 0,
    };

    await postRef.set(postData);

    toast.success('Post created!');

    router.push(`/admin/${slug}`);
  }

  return (
    <form onSubmit={createPost}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="My Awesome Article!"
        // className={styles.input}
      />
      <p>
        <strong>Slug: </strong> {slug}
      </p>
      <button type="submit" disabled={!isValid} className="btn-green">
        Create New Post
      </button>
    </form>
  );
}
