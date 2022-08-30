import './post.css'

import { selectPosts } from "./postsSlice"
import { useSelector, useDispatch } from "react-redux/es/exports";
import { useParams } from 'react-router-dom'
import { loadComments, selectComments, selectCommentsAreLoading, selectCommentsError} from '../comments/commentsSlice';
import { useEffect } from 'react';
import { Preview } from '../../components/preview/Preview';
import { Comment } from '../comments/Comment';
import { LoadingComments } from '../../components/loadingComments/LoadingComments';
import { ErrorPage } from '../../components/errorPage/ErrorPage';

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
        dispatch(loadComments(post.permalink));
      } catch (err) {
      }
    }, [])


    return ( 
      <>
      {!post ? <ErrorPage /> : 
        <div className="post-container">
          <div className='post'> 
            <Preview  preview={post}/>
          </div>
          <h2>{post.num_comments} Comments</h2>
          <div className='comments-container'>
            {areLoading ? 
            <><LoadingComments /><LoadingComments /><LoadingComments /></> 
            : error ? <ErrorPage /> 
            : comments.map(comment => {
              return <Comment key={comment.id} comment={comment} />
            })}
          </div>
        </div>}
      </>
    
    )
}