import { useSelector, useDispatch } from "react-redux";
import { selectPosts, selectIsLoading, loadPosts } from "../posts/postsSlice";
import { Filter } from "../../components/filter/Filter";
import './posts.css'
import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Preview } from "../../components/preview/Preview";

export const Posts = () => {
  const posts = useSelector(selectPosts);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const params = useParams();
  const category = params.category ? params.category : '';
  const when = params.when;

  useEffect(() => {
    dispatch(loadPosts({category, when}));
  }, [dispatch, category, when])

  return (
    <div className="posts-container">
      {isLoading ? 
        <h1>Loading...</h1> :
        <div className="posts">
          <Filter />
          {posts.map(post => {
            return <Preview key={post.id} preview={post}/>
          })}
        </div>
        }
    </div>
  )
}