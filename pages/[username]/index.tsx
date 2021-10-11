import { collection, getDocs, limit, orderBy, where, query } from "@firebase/firestore";
import PostFeed from "../../components/PostFeed";
import UserProfile from "../../components/UserProfile";
import { firestore, getUserWithUsername, postsToJSON } from "../../lib/firebase";

export async function getServerSideProps( { params } ) {
  const { username } = params;

  const userDoc = await getUserWithUsername(username);

  let user = null;
  let posts = null;

  if (userDoc) {
    user = userDoc.data();
    const postsRef = userDoc.ref.collection('posts');
    const postsQuery = postsRef
      .where("published", "==", true)
      .orderBy("createdAt", "desc")
      .limit(5);


    posts = (await postsQuery.get()).docs.map(postsToJSON);
  }

  return {
    props: { user, posts },
  }
};

export default function UserProfilePage({ user, posts }) {
  return (
    <main>
      <UserProfile user={user} />
      <PostFeed posts={posts} admin={false}/>
    </main>
  );
}