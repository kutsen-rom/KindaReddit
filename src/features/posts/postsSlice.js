import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { mapPosts } from "../../utils/utilities";

export const loadPosts = createAsyncThunk(
  'posts/loadPosts',
  async ({category, when, search, subreddit}) => {
       if (search) {
          const response = await fetch(`https://www.reddit.com/search/.json?q=${search}&limit=10`);
          const json = await response.json();
          localStorage.setItem('posts', JSON.stringify(mapPosts(json)));
          return mapPosts(json);
      }  else {
        const response = await fetch(`https://www.reddit.com/r/${subreddit}/${category}.json?${when}&limit=10`);
        const json = await response.json();
        localStorage.setItem('posts', JSON.stringify(mapPosts(json)));
        return mapPosts(json);
      }
  }
)

export const loadMorePosts = createAsyncThunk(
  'posts/loadMorePosts',
  async ({category, when, search, subreddit, after}) => {
    if (search) {
      const response = await fetch(`https://www.reddit.com/search/.json?q=${search}&limit=10${after}`);
      const json = await response.json();
      localStorage.setItem('posts', JSON.stringify(mapPosts(json)));
      return mapPosts(json);
  } else {
    const response = await fetch(`https://www.reddit.com/r/${subreddit}/${category}.json?${when}&limit=10${after}`);
    const json = await response.json();
    localStorage.setItem('posts', JSON.stringify(mapPosts(json)));
    return mapPosts(json);
  }
  }
)

export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: JSON.parse(localStorage.getItem('posts')),
        isLoading: false,
        postsError: false,
        isInfiniteScroll: false
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
                state.isInfiniteScroll = false;
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
            .addCase(loadMorePosts.fulfilled, (state, action) => {
              state.isInfiniteScroll = true;
              for (let post in action.payload) {
                state.posts.push(action.payload[post]);
              }
            })
    }
})

export const selectPost = state => state.posts.post;
export const selectPosts = state => state.posts.posts;
export const selectIsLoading = state => state.posts.isLoading;
export const selectPostsError = state => state.posts.postsError;
export const selectIsInfiniteScroll = state => state.posts.isInfiniteScroll;
export const { addPost } = postsSlice.actions;

export default postsSlice.reducer;