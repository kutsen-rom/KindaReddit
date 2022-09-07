import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { mapPosts } from "../../utils/utilities";

export const loadPosts = createAsyncThunk(
  'posts/loadPosts',
  async ({sort, top, search, subreddit}) => {
    const topSearch = (top && sort === 'top') ? `&t=${top}` : sort !== 'top' ? '' :'&t=day';
       if (search) {
          const subredditSearch = subreddit !== 'popular' ? `r/${subreddit}/` : '';
          const sortSearch = sort ? `&sort=${sort}` : '';
          const ending = subreddit!== 'popular' ? `&restrict_sr=1&sr_nsfw=` : '';
          const response = await fetch(`https://www.reddit.com/${subredditSearch}search/.json?q=${search}&limit=10${ending}${sortSearch}${topSearch}`);
          const json = await response.json();
          localStorage.setItem('posts', JSON.stringify(mapPosts(json)));
          return mapPosts(json);
      }  else {
        const response = await fetch(`https://www.reddit.com/r/${subreddit}/${sort}.json?limit=10${topSearch}`);
        const json = await response.json();
        localStorage.setItem('posts', JSON.stringify(mapPosts(json)));
        return mapPosts(json);
      }
  }
)

export const loadMorePosts = createAsyncThunk(
  'posts/loadMorePosts',
  async ({sort, top, search, subreddit, after}) => {
    const topSearch = (top && sort === 'top') ? `&t=${top}` : sort !== 'top' ? '' :'&t=day';
    if (search) {
      const subredditSearch = subreddit !== 'popular' ? `r/${subreddit}/` : '';
      const sortSearch = sort ? `&sort=${sort}` : '';
      const ending = subreddit!== 'popular' ? `&restrict_sr=1&sr_nsfw=` : '';
      const response = await fetch(`https://www.reddit.com/${subredditSearch}search/.json?q=${search}&limit=10${ending}${sortSearch}${topSearch}${after}`);
      const json = await response.json();
      localStorage.setItem('posts', JSON.stringify(mapPosts(json)));
      return mapPosts(json);
  }  else {
    const response = await fetch(`https://www.reddit.com/r/${subreddit}/${sort}.json?limit=10${topSearch}${after}`);
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
        isInfiniteScroll: false,
        noResults: false
    },
    reducers: {
      setNoResultsError: (state) => {
        state.noResults = false;
      },
      setNoError: (state) => {
        state.postsError = false;
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
              if (!action.payload.length) {
                state.noResults = true;
                state.postsError = true;
                state.isLoading = false;
                // state.posts = state.posts;
              } else {
                state.isLoading = false;
                state.postsError = false;
                state.posts = action.payload;
              }
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
export const selectNoResults = state => state.posts.noResults;

export const { setNoResultsError, setNoError } = postsSlice.actions;

export default postsSlice.reducer;