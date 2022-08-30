import './post.css'

import { addPost, selectPosts } from "./postsSlice"
import { useSelector, useDispatch } from "react-redux/es/exports";
import { useParams } from 'react-router-dom'
import { loadComments, selectComments, selectCommentsAreLoading } from '../comments/commentsSlice';
import { useEffect } from 'react';
import { Preview } from '../../components/preview/Preview';
import { Comment } from '../comments/Comment';

export const Post = () => {

    const posts = useSelector(selectPosts);
    const params = useParams();
    const dispatch = useDispatch();
    const comments = useSelector(selectComments)
    const areLoading = useSelector(selectCommentsAreLoading)

    const post = posts.filter(post => post.id === params.postId)[0]
    localStorage.setItem('post', post);

    useEffect(() => {
      dispatch(loadComments(post.permalink));
    }, [])

    console.log(post.url)

    return (
    <div className="post-container">
      <div className='post'> 
        <Preview  preview={post}/>
      </div>
        <h2>{post.num_comments} Comments</h2>
        <div className='comments-container'>
          {areLoading ? 
          <h2>Loading comments...</h2> :
          comments.map(comment => {
            return <Comment key={comment.id} comment={comment} />
          })}
        </div>

    </div>
    )
}