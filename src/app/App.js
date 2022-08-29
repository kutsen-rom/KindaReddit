import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { Posts } from '../features/posts/Posts';
import { SearchBar } from '../features/searchBar/SearchBar';

function App() {
  return (
    <Routes>
      <Route path='/' element={<SearchBar />}> 
        <Route index element={<Navigate to="hot" />} />
        <Route path=':category' element={<Posts />}>
          <Route path=':when' element={<Posts />} />
        </Route>
        
      </Route>
    </Routes>
  );
}

export default App;
