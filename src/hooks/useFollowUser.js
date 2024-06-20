import { useEffect, useState } from "react"
import useAuthStore from "../store/authStore";
import useUserProfileStore from "../store/userProfileStore";
import useShowToasta from "./useShowToasta";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

function useFollowUser(userId) {
 const [isUpdating,setIsUpdating] = useState(false);
 const [isFollowing,setIsFollowing] = useState(false);
 const authUser = useAuthStore(state => state.user);
 const setAuthUser = useAuthStore(state => state.setUser);
 const {userProfile,setUserProfile} = useUserProfileStore();
 const showToast = useShowToasta();

 const handleFollowUser = async ()=>{
    setIsUpdating(true);
    try {
        const currentUserRef = doc(firestore,"users",authUser.uid);
        const userToFollowOrUnfollowRef = doc(firestore, "users",userId);
        //update to current user following field
        await updateDoc(currentUserRef,{
            following : isFollowing ?  arrayRemove(userId) : arrayUnion(userId)
        })
         
        //update the followers of the user which is following by current user
        await updateDoc(userToFollowOrUnfollowRef, {
            followers : isFollowing ? arrayRemove(authUser.uid)  : arrayUnion(authUser.uid)
        })

        if(isFollowing){
            //unFollow
            setAuthUser({
              ...authUser,
              following : authUser.following.filter(uid => uid !== userId)
            })
            if(userProfile)
            setUserProfile({
                ...userProfile,
                followers : userProfile.followers.filter(uid => uid !==authUser.uid)
            })
            localStorage.setItem("user-info", JSON.stringify({
                ...authUser,
                following : authUser.following.filter(uid => uid !== userId)
                
            }))
            setIsFollowing(false);
        }else{
            //Follow
            setAuthUser({
                ...authUser,
                following : [...authUser.following, userId]
            })
            if(userProfile)
            setUserProfile({
                ...userProfile,
                followers : [...userProfile.followers, authUser.uid]
        })
        localStorage.setItem("user-info", JSON.stringify({
            ...authUser,
            following: [...authUser.following, userId]
        }))
        }
        setIsFollowing(true);
        
    } catch (error) {
        showToast("Error",error.message,"error");
    }
    finally{
        setIsUpdating(false);
    }
 }

 useEffect(()=>{
  if(authUser){
    const isFollowing=authUser.following.includes(userId);
    setIsFollowing(isFollowing);
    
  }
 },[isUpdating,userId])

    return {isUpdating,isFollowing, handleFollowUser}
}

export default useFollowUser
