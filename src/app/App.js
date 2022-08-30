import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { Posts } from '../features/posts/Posts';
import { SearchBar } from '../features/searchBar/SearchBar';
import { Post } from '../features/posts/Post'
import { ErrorPage } from '../components/errorPage/ErrorPage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<SearchBar />}> 
        <Route index element={<Navigate to="hot" />} />
        <Route path=':category' element={<Posts />}>
          <Route path=':when' element={<Posts />} />
        </Route>
        <Route path='comments/post/:postId' element={<Post />} />
        
      </Route>
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
