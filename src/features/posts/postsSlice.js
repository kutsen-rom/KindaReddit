import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//! post_hint ,author, created_utc, title, id, num_comments, permalink, score, subreddit_name_prefixed, url, 
//* preview.images.0.source.url

const mapPosts = (json) => {
  return json.data.children.map(post => ({
    author: post.data.author,
    subreddit_name_prefixed: post.data.subreddit_name_prefixed,
    title: post.data.title,
    id: post.data.id,
    post_hint: post.data.post_hint,
    created_utc: post.data.created_utc,
    num_comments: post.data.num_comments,
    permalink: post.data.permalink,
    score: post.data.score,
    url: post.data.url
}));
}

export const loadPosts = createAsyncThunk(
  'posts/loadPosts',
  async ({category, when}) => {
      if (when) {
        const response = await fetch(`https://www.reddit.com/r/popular/${category}.json?t=${when}`);
        const json = await response.json();
        return mapPosts(json);
      } else {
        const response = await fetch(`https://www.reddit.com/r/popular/${category}.json`);
        const json = await response.json();
       return mapPosts(json);
      }
  }
)
//https://www.reddit.com/r/popular/top.json?t=week

export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        isLoading: false,
        hasError: false,
        category: ''
    },
    reducers: {
      setCategory: (state, action) => {
        state.category = action.payload;
      }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadPosts.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(loadPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                state.posts = action.payload;
            })
            .addCase(loadPosts.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            })
    }
})

export const selectPosts = state => state.posts.posts;
export const selectIsLoading = state => state.posts.isLoading;
export const { setCategory } = postsSlice.actions;

export default postsSlice.reducer;