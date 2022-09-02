import './post.css'

import { selectPosts } from "./postsSlice"
import { useSelector, useDispatch } from "react-redux/es/exports";
import { useParams, Link } from 'react-router-dom'
import { loadComments, selectComments, selectCommentsAreLoading, selectCommentsError} from '../comments/commentsSlice';
import { useEffect } from 'react';
import { Preview } from '../../components/preview/Preview';
import { Comment } from '../comments/Comment';
import { LoadingComments } from '../../components/loadingComments/LoadingComments';
import { ErrorPage } from '../../components/errorPage/ErrorPage';
import { parseNumbers } from '../../utils/utilities';
import { BackToTop } from '../../components/backToTop/BackToTop';

export const Post = () => {

    const posts = useSelector(selectPosts);
    const params = useParams();
    const dispatch = useDispatch();
    const comments = useSelector(selectComments);
    const areLoading = useSelector(selectCommentsAreLoading);
    const error = useSelector(selectCommentsError)

    const post = posts.filter(post => post.id === params.postId)[0];

    useEffect(() => {
      try {
        window.scrollTo(0, 0);
        dispatch(loadComments(post.permalink));
      } catch (err) {
      }
      // eslint-disable-next-line
    }, [])


    return ( 
      <>
      {!post ? <ErrorPage /> : 
        <div className="post-container">
               <div className='subreddit'>
            <Link to={`/${post.subreddit}/hot`} ><b>{post.subredditPrefixed}</b><div className='separate'>&nbsp;•&nbsp;</div><div><b>{parseNumbers(post.subscribers)} subscribers</b></div></Link>
          </div>
          <div className='post'> 
            <Preview preview={post}/>
          </div>
          <h2>{parseNumbers(post.numComments)} Comments</h2>
          <div className='comments-container'>
            {areLoading ? 
            <><LoadingComments /><LoadingComments /><LoadingComments /></> 
            : error ? <ErrorPage /> 
            : comments.map(comment => {
              return <Comment key={comment.id} comment={comment} />
            })}
          </div>
          <BackToTop />
        </div>}
      </>
    
    )
}