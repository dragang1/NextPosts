
import { formatDate } from '@/lib/format';
import LikeButton from './like-icon';
import { toggleLikeButton } from '@/actions/post';
import Image from 'next/image';



function Post({ post }) {

  return (
    <article className="post">
      <div className="post-image">
        <Image src={post.image} fill alt={post.title} />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{' '}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>
            <form
              action={toggleLikeButton.bind(null, post.id)}
              className={post.isLiked ? 'liked' : ''}
            >

              <LikeButton />
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

export default function Posts({ posts }) {
  if (!posts || posts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  return (
    <ul className="posts">
      {posts.map((post) => (
        <li key={post.id}>
          <Post post={post} />
        </li>
      ))}
    </ul>
  );
}
