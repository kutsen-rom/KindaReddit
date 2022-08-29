import React from 'react';
import { Routes, Route } from "react-router-dom";
import { Posts } from '../features/posts/Posts';
import { SearchBar } from '../features/searchBar/SearchBar';

function App() {
  return (
    <Routes>
      <Route path='/' element={<SearchBar />}> 
        <Route index element={<Posts />} />
        <Route path=':category' element={<Posts />}>
          <Route path=':when' element={<Posts />} />
        </Route>
        
      </Route>
    </Routes>
  );
}

export default App;
