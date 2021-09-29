import { collection, getDocs, limit, orderBy, where, query } from "@firebase/firestore";
import PostFeed from "../../components/PostFeed";
import UserProfile from "../../components/UserProfile";
import { firestore, getUserWithUsername, postsToJSON } from "../../lib/firebase";

export async function getServerSideProps( queryProps ) {
  const { username } = queryProps.params;

  const userDoc = await getUserWithUsername(username);

  let user = null;
  let posts = null;

  if (userDoc) {
    user = userDoc.data();
    const postsRef = collection(userDoc.ref, 'posts');
    const postsQuery = query(
      postsRef, 
      where('published', '==', true),
      orderBy('createdAt', 'desc'),
      limit(5)
    );

    posts = (await getDocs(postsQuery)).docs.map(postsToJSON);
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