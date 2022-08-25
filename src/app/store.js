import { configureStore } from '@reduxjs/toolkit';
import searchBarReducer from '../features/searchBar/searchBarSlice'

export const store = configureStore({
  reducer: {
    searchBar: searchBarReducer
  },
});
