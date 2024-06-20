import { useEffect, useState } from "react"
import useShowToasta from "./useShowToasta";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

function useGetProfileById(userId) {
  const [isLoading,setIsLoading] = useState(true);
  //get state for contain userprofile data from reactState
  const[userProfile,setUserProfile] =useState(null);
    const showToast = useShowToasta();
    
    useEffect(()=>{
      const getProfileById = async ()=>{
        setIsLoading(true);
        setUserProfile(null);
        try {
            const userRef = await getDoc(doc(firestore,"users",userId));
            if(userRef.exists()){
                setUserProfile(userRef.data());
            }
            
        } catch (error) {
            showToast("Error",error.message,"error");
        }finally{
            setIsLoading(false);
        }
      }
      getProfileById();
    },[showToast,setUserProfile,userId])
    return {isLoading,userProfile,setUserProfile};
}

export default useGetProfileById
