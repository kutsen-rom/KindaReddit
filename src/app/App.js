import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { Posts } from '../features/posts/Posts';
import { SearchBar } from '../features/searchBar/SearchBar';
import { Post } from '../features/posts/Post'

function App() {
  return (
    <Routes>
      <Route path='/' element={<SearchBar />}> 
        <Route index element={<Navigate to="popular/hot" />} />
        <Route path=':subreddit/:sort' element={<Posts />}>
          <Route path=':top' element={<Posts />} />
        </Route>
        <Route path='comments/post/:postId' element={<Post />} />
      </Route>
      <Route path='*' element={<SearchBar routeError='error' />} />
    </Routes>
  );
}

export default App;
