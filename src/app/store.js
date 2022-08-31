import { configureStore } from '@reduxjs/toolkit';
import postsSliceReducer from '../features/posts/postsSlice';
import commentsSliceReducer from '../features/comments/commentsSlice';

export const store = configureStore({
  reducer: {
    posts: postsSliceReducer,
    comments: commentsSliceReducer
  },
});
