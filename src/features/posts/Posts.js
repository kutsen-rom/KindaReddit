import './posts.css'
import './post.css'

import { useSelector } from "react-redux";
import { selectPosts, selectIsInfiniteScroll } from "../posts/postsSlice";
import { Sort } from "../../components/sort/Sort";
import { Link, useOutletContext } from 'react-router-dom';
import { Preview } from "../../components/preview/Preview";
import { parseNumbers } from '../../utils/utilities';
import { BackToTop } from '../../components/backToTop/BackToTop';


export const Posts = () => {
  const posts = useSelector(selectPosts);
  const isInfiniteScroll = useSelector(selectIsInfiniteScroll);
  // eslint-disable-next-line
  const [search, setSearch] = useOutletContext();

  return (
    <>
      {posts &&
        <div className="posts-container">
          {!isInfiniteScroll && window.scrollTo(0, 0)}
            <div className="posts">
            {posts.every(post => post.subreddit === posts[0].subreddit) && 
              <div className='subreddit-posts'>
                <Link onClick={() => setSearch('')} to={`/${posts[0].subreddit}/hot`}><b>{posts[0].subredditPrefixed}<div className='separator-posts'>&nbsp;•&nbsp;</div><div>{parseNumbers(posts[0].subscribers)} subscribers</div></b></Link>
              </div>}
           <Sort />
           {posts.map(post => {
             return <Link onClick={() => setSearch('')} className='post-box' to={`/comments/post/${post.id}`}><Preview key={post.id} preview={post}/></Link>
           })}
            </div>
            <BackToTop />
        </div>
         }
    </>
    
  )
}