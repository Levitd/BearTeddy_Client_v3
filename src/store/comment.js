import { createSlice } from "@reduxjs/toolkit";
import ProductService from "../services/product.service";
import CommentService from "../services/comment.service";
import viewedReducer from "./viewed";

const initialState = {
        entities: null,
        isLoading: false,
        error: null,
        dataLoaded: false
    };

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        commentRequested: (state) => {
            state.isLoading = true;
            state.dataLoaded = false;
        },
        commentReceved: (state, action) => {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        commentRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
    }
});

const { reducer: commentReducer, actions } = commentSlice;
const { commentRequestFiled,commentRequested, commentReceved } = actions;

export const commentCreate =(data) => async (dispatch)=>{
        dispatch(commentRequested());
        try {
            const { content } = await CommentService.create(data);
            dispatch(commentReceved(content))
        } catch (error) {
            dispatch(commentRequestFiled(error.message));
        }
};

export const getCommentIsLoading = () => (state) => state.comment.isLoading;
export const getComment = () => (state) => state.comment.entities;
export const getCommentDataLoaded = () => (state) => state.comment.dataLoaded;
export const getCommentError = () => (state) => state.comment.error;

export default commentReducer;