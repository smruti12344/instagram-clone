import { useEffect, useState } from "react"
import useAuthStore from "../store/authStore";
import useShowToasta from "./useShowToasta";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

function useGetSuggestedUser() {
const [isLoading,setIsLoading] = useState(true);
const[suggestedUsers,setSuggestedUsers] = useState([]);
const authUser = useAuthStore(state => state.user);
const showToast = useShowToasta();

useEffect(()=>{
 const getSuggestedUsers = async ()=>{
    setIsLoading(true);
    try {
        //This line initializes a reference to the "users" collection in Firestore. This userRef can be used to query or interact with the "users" collection.
        const userRef = collection(firestore,"users");
        //This function constructs a query object that can be used to retrieve documents from the userRef collection based on the specified conditions
        const q = query(
            userRef,
            //The query fetches up to 4 user documents from the "users" collection, excluding those with UIDs matching the authenticated user or their followed users, and orders the results by UID
            where("uid","not-in",[authUser.uid,...authUser.following]),
            orderBy("uid"),
            limit(4)
        );
        const querySnapshot = await getDocs(q);
        const users=[];
        querySnapshot.forEach((userdoc)=>{
            users.push({...userdoc.data() , id:userdoc.id})
        })
        setSuggestedUsers(users);
        
    } catch (error) {
        showToast("Error",error.message,"error");
    }
   
    finally{
        setIsLoading(false);
    }
    
   
 }
 //when user exist call the fun
 if(authUser){
    getSuggestedUsers();
}
},[authUser,showToast])
  
    return {isLoading,suggestedUsers}
}

export default useGetSuggestedUser
