import { deleteObject, ref } from "firebase/storage"
import { firestore, storage } from "../firebase/firebase"
import useShowToasta from "./useShowToasta"
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import usePostStore from "../store/PostStore";
import useUserProfileStore from "../store/userProfileStore";
function useDeletePost() {
    //get state for deleting post
 const [isDeleeting,setDeleting] = useState(false);
    const showToast = useShowToasta();
    //get state for deleting post from postStore
    const deletePost = usePostStore(state => state.deletePost);
    
    const handleDeletePost = async (id,userId)=>{
        if(!window.confirm("Are you want to removed this post?")) return;
        setDeleting(true);
       try {
        const imgRef = ref(storage,`posts/${id}`);
        console.log(imgRef);
        await deleteObject(imgRef);
        const userRef = doc(firestore,"users",userId);
        await deleteDoc(doc(firestore,"posts",id));
        await updateDoc(userRef,{posts:arrayRemove(id)})
        deletePost(id);
      
       } catch (error) {
        showToast("Error",error.message,"error");
       }
       finally{
         setDeleting(false);
       }

    }
  return {handleDeletePost,isDeleeting};
}

export default useDeletePost
