import { useEffect, useState } from "react"
import usePostStore from "../store/PostStore";
import useUserProfileStore from "../store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useShowToasta from "./useShowToasta";

function useGetUserPost() {
    // state to managed loading state
    const [isLoading,setIsLoading] = useState(true);
    // get the state for post ans setPost from Post Store
    const {posts,setPosts} = usePostStore();
    // get the state for userProfile from userProfile Store
    const userProfile = useUserProfileStore(state=> state.userProfile);
    //get state from useShowToast-hook for displaying message
    const showToast = useShowToasta();
    // after component created load data
    useEffect(()=>{
      const getPosts = async ()=>{
          //check user-Profile exist or not
     if(!userProfile){
        return
     }
     //set state is loading
     setIsLoading(true);
     setPosts([]);
     try {
        //query(...): This function creates a query object that can be used to request a subset of documents from the "posts" collection.
        const q = query(collection(firestore,"posts"), where("createdBy","==",userProfile.uid));
        const querySnapshot = await getDocs(q);
        const posts =[];
        
        querySnapshot.forEach(doc => {
            // console.log(doc.id);
            posts.push({...doc.data(),id:doc.id});
        });
        // sort
        posts.sort((a,b)=> b.createdAt - a.createdAt)
        setPosts(posts);
        
     } catch (error) {
        showToast("Error",error.message,"error");
        setPosts([]);
     }
     finally{
        setIsLoading(false);
     }
      }
      getPosts();
    },[setPosts,userProfile,showToast])
  return {isLoading,posts}
}

export default useGetUserPost
