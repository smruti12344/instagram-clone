import { useState } from "react"
import useShowToasta from "./useShowToasta";
import useAuthStore from "../store/authStore";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import usePostStore from "../store/PostStore";

function usePostComment() {
    //get state for commenting from react-state 
const [isCommenting , setCommenting] = useState(false);
const showToast = useShowToasta();
const authUser = useAuthStore(state=> state.user);
//get state for displying comment from postStore
const AddComment = usePostStore(state => state.addComment); 
//handle Post-Comment function
// const handleComment = async(postId, comment)=>{
 
//     if(isCommenting){
//         return
//     }
//     if(!authUser){
//         return showToast("Error","Please loggedin to comment","error");
//     }
//     setCommenting(true);
//     //get object to add in comments of post coolection
//     const newComment = {
//         comment,
//         createdAt: Date.now(),
//         createdBy : authUser.uid,
//         postId
//     }
//     try {
//      //update post collection
//      await updateDoc(doc(firestore,"posts",postId),{
//         comments : arrayUnion(newComment)
//      })
     
//      //addComment to PostStore
//     //  console.log(newComment.comment);
//      addComment(postId,newComment);
//      showToast("Success","post commented","success");
        
//     } catch (error) {
//         showToast("Error",error.message,"error");
//     }finally{
//         setCommenting(false);
//     }
// }
const handleComment = async (postId, commentText) => {
    if (isCommenting) {
        return;
    }
    if (!authUser) {
        return showToast("Error", "Please log in to comment", "error");
    }
    setCommenting(true);

    const newComment = {
        commentId: `${postId}-${Date.now()}`, // Generate a unique commentId
        comment: commentText,
        createdAt: Date.now(),
        createdBy: authUser.uid,
        postId,
    };

    try {
        await updateDoc(doc(firestore, "posts", postId), {
            comments: arrayUnion(newComment),
        });

        AddComment(postId, newComment);
        showToast("Success", "Post commented", "success");
    } catch (error) {
        showToast("Error", error.message, "error");
    } finally {
        setCommenting(false);
    }
};

    return {isCommenting,handleComment}; 
}

export default usePostComment