import { configureStore } from '@reduxjs/toolkit';
import themeSliceReducer from '../features/theme/themeSlice'
import postsSliceReducer from '../features/posts/postsSlice';
import commentsSliceReducer from '../features/comments/commentsSlice';

export const store = configureStore({
  reducer: {
    theme: themeSliceReducer,
    posts: postsSliceReducer,
    comments: commentsSliceReducer
  },
});
