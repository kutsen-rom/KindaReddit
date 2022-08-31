import './posts.css'
import './post.css'

import { useSelector } from "react-redux";
import { selectPosts, selectIsLoading } from "../posts/postsSlice";
import { Sort } from "../../components/sort/Sort";
import { Link, useParams } from 'react-router-dom';
import { Preview } from "../../components/preview/Preview";

export const Posts = () => {
  const posts = useSelector(selectPosts);
  const isLoading = useSelector(selectIsLoading);
  const params = useParams();



  return (
    
    <div className="posts-container">
      {window.scrollTo(0, 0)}
      {isLoading ? 
        <h1>Loading...</h1> :
        <div className="posts">
          {posts.every(post => post.subreddit === posts[0].subreddit) && 
          <div className='subreddit-posts'>
            <Link to={`/${posts[0].subreddit}/hot`}><b>{posts[0].subredditPrefixed}<div className='separator-posts'>&nbsp;•&nbsp;</div><div>{posts[0].subscribers} subscribers</div></b></Link>
          </div>}
          <Sort />
          {posts.map(post => {
            return <Link className='post-box'  to={`/comments/post/${post.id}`}><Preview key={post.id} preview={post}/></Link>
          })}
        </div>
        }
    </div>
  )
}