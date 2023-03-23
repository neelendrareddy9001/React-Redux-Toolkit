import { createSlice , nanoid, createAsyncThunk} from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from 'axios';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
    posts : [],
    status : 'idle', //'dile' | 'loading' | 'succeeded' | 'failed'
    err : null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try {
        const response = await axios.get(POSTS_URL)
        return [...response.data];
    } catch (err) {
        return err.message;
    }
})

const postSlice = createSlice({
    name : 'posts',
    initialState,
    reducers : {
        postAdded : {
            reducer (state, action) {
            state.posts.posts.push(action.payload)
        },
        prepare(title, content, userId) {
            return {
                payload : {
                    id : nanoid(),
                    title,
                    date : new Date().toISOString(),
                    content,
                    userId,
                    reactions : {
                        thumbsUp : 0,
                        wow : 0,
                        heart : 0,
                        rocket : 0,
                        coffee : 0
                    }
                }
            }
        }
    },
    reactionAdded(state, action) {
        const {postId, reaction} = action.payload;
        const existingPost = state.posts.posts.find(post => post.id === postId)
        if(existingPost) {
            existingPost.reactions[reaction]++
        }
    }
},
  extraReducers(builder) {
    builder
        .addCase(fetchPosts.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(fetchPosts.fulfilled, (state, action) =>{
            state.status = 'succeeded'
            //Adding date and reactions
            let min = 1;
            const loadedPosts = action.payload.map(post => {
                post.date = sub(new Date(), {minutes : min++}).toISOString();
                post.reaction = {
                    thumbsUp : 0,
                    hooray : 0,
                    heart : 0,
                    rocket : 0,
                    eyes : 0
                }
                return post;
            });
            //Add any fetched post to the array
            state.posts = state.posts.concat(loadedPosts)
        })
        .addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed'
            state.err = action.error.message
        })
}  
});

export const selectAllPosts = (state) => state.posts.posts;
export const getPostStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const {postAdded,reactionAdded} = postSlice.actions

export default postSlice.reducer
