import { configureStore } from '@reduxjs/toolkit';
import themeSliceReducer from '../features/theme/themeSlice'
import postsSliceReducer from '../features/posts/postsSlice';

export const store = configureStore({
  reducer: {
    theme: themeSliceReducer,
    posts: postsSliceReducer
  },
});
