import React, { useState } from 'react'
import useAuthStore from '../store/authStore';
import useShowToasta from './useShowToasta';
import { firestore } from '../firebase/firebase';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';

function useLikePost(post) {
    // console.log(post);
    //get state for loading from react-state
  const [isUpdating, setIsUpdating] = useState(false);
  //get state for user authentication from useAuthStore
  const authUser = useAuthStore(state => state.user);
  //get state for count likes from react-state
  const [likes,setLikes] = useState(post.likes.length);
// const [likes, setLikes] = useState(post?.likes?.length ?? 0);

  //get state for updating likes from useState
  const [isLiked , setIsLiked] = useState(post.likes.includes(authUser?.uid));
  //get state for displaying msg from ShowToasta
  const showToast = useShowToasta();

  const handleLikePost = async ()=>{
    if(isUpdating){
        return;
    }
    if(!authUser){
       return showToast("Error",error.message,"error");
    }
    setIsUpdating(true);
    try {
        const postRef = doc(firestore,"posts",post.id);
        await updateDoc(postRef,{
            likes : isLiked ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid)
        })
        setIsLiked(!isLiked);
        isLiked ? setLikes(likes-1) : setLikes(likes+1);
    } catch (error) {
        showToast("Error",error.message,"error");
    }finally{
        setIsUpdating(false);
    }
  }
    return {isUpdating,isLiked,likes,handleLikePost};
}

export default useLikePost
