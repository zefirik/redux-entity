/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useCallback} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments,
         commentsSelectors,
         deleteComment,
         patchComment } from "./commentsSlice";
import  Comment from "./components/Comment";


 const Comments = () => {
    const dispatch = useDispatch();
    const allComments = useSelector(commentsSelectors.selectAll);
    
    const onDelete = useCallback((id) => dispatch(deleteComment(id)),[]);
    const onPatch = useCallback((id, newObj) => dispatch(patchComment({id,newObj})),[])
    // examples for select another entity
    // const total = useSelector(commentsSelectors.selectTotal);
    // const commentWithId5 = useSelector(state => commentsSelectors.selectById(state, 5));
    console.log(allComments);

    useEffect(() => {
        dispatch(fetchComments());
        console.log("useEffect");
    },[dispatch])

     return (
        <div>
         {allComments.map(({id, body}) => 
            <Comment key ={id} 
                     id = {id}
                     body = {body} 
                     onDelete={onDelete} 
                     onPatch={onPatch}
            />)
         }
        </div>
     )
 }

 export default Comments;