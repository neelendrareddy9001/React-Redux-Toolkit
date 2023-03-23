import { createSlice , nanoid, createAsyncThunk} from "@reduxjs/toolkit";
import { sub } from "date-fns";

const POSTS_URL = 'https://jsoplaceholder.typicode.com/posts';


const initialState = {
    posts : [],
    status : 'idle', //'dile' | 'loading' | 'succeeded' | 'failed'
    err : null
}

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
}});

export const selectAllPosts = (state) => state.posts.posts;

export const {postAdded,reactionAdded} = postSlice.actions

export default postSlice.reducer