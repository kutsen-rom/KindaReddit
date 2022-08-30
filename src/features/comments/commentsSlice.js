import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { mapComments } from "../../utils/utilities";
export const loadComments = createAsyncThunk(
    'comments/loadComments',
    async (url) => {
        const response = await fetch(`https://www.reddit.com${url}.json`);
        const json = await response.json();
        return mapComments(json[1])
    }
)

export const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
      comments: [],
      commentsAreLoading: false,
      commentsError: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadComments.pending, (state) => {
              state.commentsAreLoading = true;
            })
            .addCase(loadComments.fulfilled, (state, action) => {
              state.commentsAreLoading = false;
              state.commentsError = false;
              state.comments = action.payload;
            })
            .addCase(loadComments.rejected, (state) => {
              state.commentsAreLoading = false;
              state.commentsError = false;
            })
    }

})

export const selectComments = state => state.comments.comments;
export const selectCommentsAreLoading = state => state.comments.commentsAreLoading;
export const selectCommentsError = state => state.comments.commentsError;

export default commentsSlice.reducer