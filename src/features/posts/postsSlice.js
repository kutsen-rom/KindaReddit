import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { mapPosts } from "../../utils/utilities";
//! post_hint ,author, created_utc, title, id, num_comments, permalink, score, subreddit_name_prefixed, url, 
//* preview.images.0.source.url
// preview: post.data.preview.images[0].resolutions[2],

export const loadPosts = createAsyncThunk(
  'posts/loadPosts',
  async ({category, when, search}) => {
      if (when) {
        const response = await fetch(`https://www.reddit.com/r/popular/${category}.json?t=${when}&limit=3`);
        const json = await response.json();
        localStorage.setItem('posts', JSON.stringify(mapPosts(json)));
        return mapPosts(json);
      } else if (search) {
          const response = await fetch(`https://www.reddit.com/search/.json?q=${search}`);
          const json = await response.json();
          localStorage.setItem('posts', JSON.stringify(mapPosts(json)));
          return mapPosts(json);
      } else {
          const response = await fetch(`https://www.reddit.com/r/popular/${category}.json?limit=3`);
          const json = await response.json();
          localStorage.setItem('posts', JSON.stringify(mapPosts(json)));
          return mapPosts(json);
      }
  }
)
//https://www.reddit.com/r/popular/top.json?t=week
export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: JSON.parse(localStorage.getItem('posts')),
        isLoading: false,
        postsError: false,
    },
    reducers: {
      addPost: (state, action) => {
        state.post = action.payload;
      }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadPosts.pending, (state) => {
                state.isLoading = true;
                state.postsError = false;
            })
            .addCase(loadPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.postsError = false;
                state.posts = action.payload;
            })
            .addCase(loadPosts.rejected, (state) => {
                state.isLoading = false;
                state.postsError = true;
            })
    }
})

export const selectPost = state => state.posts.post;
export const selectPosts = state => state.posts.posts;
export const selectIsLoading = state => state.posts.isLoading;
export const selectPostsError = state => state.posts.postsError;
export const { addPost } = postsSlice.actions;

export default postsSlice.reducer;