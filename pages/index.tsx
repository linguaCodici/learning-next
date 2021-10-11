import styles from '../styles/Home.module.css'
import Loader from '../components/Loader';
import { collectionGroup, getDocs, limit, orderBy, query, startAfter, where } from '@firebase/firestore';
import { firestore, postsToJSON, fromMillis } from '../lib/firebase';
import { useState } from 'react';
import PostFeed from '../components/PostFeed';

const LIMIT = 1;

export async function getServerSideProps( context ) {
  const postsRef = firestore.collectionGroup('posts');
  const postsQuery = postsRef
    .where("published", "==", true)
    .orderBy("createdAt", "desc")
    .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postsToJSON);

  return {
    props: { posts },
  };
}

export default function Home(props) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);

  const getMorePosts = async () => {
    setLoading(true);

    const last = posts[posts.length - 1];
    const cursor = typeof last.createdAt === 'number' ? fromMillis(last.createdAt) : last.createdAt;

    const postsRef = firestore.collectionGroup('posts');
    const postsQuery = postsRef
      .where("published", "==", true)
      .orderBy("createdAt", "desc")
      .startAfter(cursor)
      .limit(LIMIT);


    const newPosts = (await postsQuery.get()).docs.map( (doc) => doc.data() );
    setPosts(posts.concat(newPosts));
    setLoading(false);

    if(newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <main>
      <PostFeed posts={posts} admin={false}/>

      {!loading && !postsEnd && 
        <button onClick={getMorePosts}>Load more</button>
      }

      <Loader show={loading}></Loader>

      {postsEnd && 'You have reached the end!'}
    </main>
  )
}
