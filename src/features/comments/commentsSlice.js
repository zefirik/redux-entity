import { createSlice,
         createEntityAdapter,
         createAsyncThunk } from "@reduxjs/toolkit";


export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async () => {
        return await fetch('https://jsonplaceholder.typicode.com/comments?_limit=10')
        .then((res) =>  res.json())
    });

export const deleteComment = createAsyncThunk(
    'comment/deleteComment',
    async(id) => {
        await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`,
        {method: 'DELETE',
      })
      return id;
    }
);
        
const commentsApdater =  createEntityAdapter({
    selectId: (comment) => comment.id,
});

export const patchComment = createAsyncThunk(
    'comment/patchComment',
    async({id, newObj}) => {
    await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`,
        {method: 'PATCH',
         body: JSON.stringify(newObj),
        })
        return {id , changes: newObj};
    }
);


const commentsSlice  = createSlice ({
    name: 'comments',
    initialState: commentsApdater.getInitialState({losding: false}),
    reducers: {
        setAllComments: commentsApdater.setAll,
        setOneComments: commentsApdater.removeOne,
        setManyComments: commentsApdater.addMany,
        updateOneComment: commentsApdater.updateOne,

    },
    extraReducers: {
        [fetchComments.pending](state){
            state.loading = true
        },
        [fetchComments.fulfilled](state, {payload}){
            state.loading = false
            commentsApdater.setAll(state, payload)
        },
        [fetchComments.rejected](state){
            state.loading = false
        },
        [deleteComment.pending](state){
            state.loading = true
        },
        [deleteComment.fulfilled](state, {payload: id}){
            state.loading = false
            commentsApdater.removeOne(state,id);
        },
        [deleteComment.rejected](state){
            state.loading = false
        },
        [patchComment.pending](state){
            state.loading = true
        },
        [patchComment.fulfilled](state, {payload}){
            state.loading = false
            commentsApdater.updateOne(state,{
                id: payload.id, 
                changes: payload.changes,
            });
        },
        [patchComment.rejected](state){
            state.loading = false
        },
    },
})

export const commentsSelectors = commentsApdater.getSelectors(state => state.comments);

export const {
    setAllComments,
    setManyComments,
    setOneComments,
    updateOneComment,
} = commentsSlice.actions;

export default commentsSlice.reducer;