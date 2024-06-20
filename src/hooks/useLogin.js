import useShowToasta from './useShowToasta'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';


function useLogin() {
 //access showToast for displaying message
 const showToast=useShowToasta();
 //access hook for navigate for one page to another
 const navigate = useNavigate();

// used react-firebase-hooks for signin using email and password
const [
    signInWithEmailAndPassword,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth); 

  const loginUser = useAuthStore(state=>state.login);

  //login-function
  const login = async (inputs)=>{
    try {
        // restricted for non-empty inputs
        if(!inputs.email || !inputs.password){
           return showToast("Error","please fill all the inputs","error");
        }
          //check user exist or not
        const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password);
        if(userCred){
            const docRef = doc(firestore, "users", userCred.user.uid);
            const docSnap = await getDoc(docRef);
            // console.log(docSnap.data());
            //add data to localstorage 
            localStorage.setItem("user-info",JSON.stringify(docSnap.data()));
           loginUser(docSnap.data());
           navigate('/');
           
        }
    } catch (error) {
        showToast("Error",error.message,"error");
        
    }
  };
  return {login,loading,error};

}

export default useLogin
