import './posts.css'

import { useSelector } from "react-redux";
import { selectPosts, selectIsLoading } from "../posts/postsSlice";
import { Filter } from "../../components/filter/Filter";
import { Link } from 'react-router-dom';
import { Preview } from "../../components/preview/Preview";

export const Posts = () => {
  const posts = useSelector(selectPosts);
  const isLoading = useSelector(selectIsLoading);
  console.log(posts);
  



  return (
    <div className="posts-container">
      {isLoading ? 
        <h1>Loading...</h1> :
        <div className="posts">
          <Filter />
          {posts.map(post => {
            return <Link to={`/comments/post/${post.id}`}><Preview key={post.id} preview={post}/></Link>
          })}
        </div>
        }
    </div>
  )
}