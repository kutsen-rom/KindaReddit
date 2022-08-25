import React from 'react';
import { Routes, Route } from "react-router-dom";
import { SearchBar } from '../features/searchBar/SearchBar';





function App() {



  return (
    <Routes>
      <Route path='/' element={<SearchBar />} />
    </Routes>
  );
}

export default App;
