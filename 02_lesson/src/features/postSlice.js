import { createSlice , nanoid} from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = [
    {
        id : '1', 
        title : 'Learning Redux Toolkit', 
        content: "I've heard good thing ",
        date : sub(new Date(), {minutes : 10}).toISOString(),
        reactions : {
            thumbsUp : 0,
            rocket : 0,
            wow : 0,
            heart : 0,
            coffee : 0
        }
    },
    {
        id : '2', 
        title : 'Slices...', 
        content : "The more I say slice, the more I want pizza.",
        date : sub(new Date(), {minutes : 10}).toISOString(),
        reactions : {
            thumbsUp : 0,
            rocket : 0,
            wow : 0,
            heart : 0,
            coffee : 0
        }
    }
]


const postSlice = createSlice({
    name : 'posts',
    initialState,
    reducers : {
        postAdded : {
            reducer (state, action) {
            state.push(action.payload)
        },
        prepare(title, content, userId) {
            return {
                payload : {
                    id : nanoid(),
                    title,
                    date : new Date().toISOString(),
                    content,
                    userId
                }
            }
        }
    }
}});

export const selectAllPosts = (state) => state.posts;

export const {postAdded} = postSlice.actions

export default postSlice.reducer
