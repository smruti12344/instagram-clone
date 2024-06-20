import { useState } from "react"
import useShowToasta from "./useShowToasta";
import { collection,  getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

function useSearchUser() {

    const [isLoading,setIsLoading] = useState(false);
    const [user,setUser] = useState(null);
    const showToast = useShowToasta();

    const SearchUserProfile = async(username) =>{
        setIsLoading(true);
        setUser(null);
        try {
            // This creates a query object that will be used to fetch documents from the "users" collection where the field username matches the value of the variable username.
            const q = query(collection(firestore,"users"), where("username","==",username));
            // This function is used to execute a query (q) and retrieve the documents that match the query constraints from Firestore. It returns a Promise that resolves to a QuerySnapshot.
            const querySnapshot = await getDocs(q);
            if(querySnapshot.empty){
                return showToast("Error","User not Found !","error");
            }
            querySnapshot.forEach((doc)=>{
                setUser(doc.data());
            })
            console.log(user);
        } catch (error) {
            showToast("Error",error.message,"error");
            setUser(null);
        }
        finally{
            setIsLoading(false);
        }
    }
  return {isLoading,SearchUserProfile, user , setUser};
}

export default useSearchUser
