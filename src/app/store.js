import { configureStore } from '@reduxjs/toolkit';
import themeSliceReducer from '../features/theme/themeSlice'

export const store = configureStore({
  reducer: {
    theme: themeSliceReducer
  },
});
