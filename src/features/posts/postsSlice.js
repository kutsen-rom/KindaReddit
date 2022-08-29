import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//! post_hint ,author, created_utc, title, id, num_comments, permalink, score, subreddit_name_prefixed, url, 
//* preview.images.0.source.url
// preview: post.data.preview.images[0].resolutions[2],

const mapPosts = (json) => {
  console.log(json.data.children);
  return json.data.children.map(post => ({
    author: post.data.author,
    subreddit_name_prefixed: post.data.subreddit_name_prefixed,
    title: post.data.title,
    id: post.data.id,
    created_utc: post.data.created_utc,
    num_comments: post.data.num_comments,
    permalink: post.data.permalink,
    score: post.data.score,
    url: post.data.url,
    post_hint: post.data.post_hint,
    thumbnail: post.data.thumbnail,
    is_video: post.data.is_video,
    selftext: post.data.selftext_html,
    preview: post.data.preview,
    ...(post.data.media) && {video: post.data.media.reddit_video}

    
}));
}

export const loadPosts = createAsyncThunk(
  'posts/loadPosts',
  async ({category, when, search}) => {
      if (when) {
        const response = await fetch(`https://www.reddit.com/r/popular/${category}.json?t=${when}&limit=100`);
        const json = await response.json();
        return mapPosts(json);
      } else if (search) {
          const response = await fetch(`https://www.reddit.com/search/.json?q=${search}`);
          const json = await response.json();
          return mapPosts(json);
      } else {
          const response = await fetch(`https://www.reddit.com/r/popular/${category}.json?limit=100`);
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