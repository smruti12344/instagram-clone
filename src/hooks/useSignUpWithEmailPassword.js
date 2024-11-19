import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase/firebase';
import { collection, doc, query, getDocs, where, setDoc } from 'firebase/firestore';
import useShowToasta from './useShowToasta';
import useAuthStore from '../store/authStore';

function useSignUpWithEmailPassword() {
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
   const showToasta = useShowToasta();
    // configure state for state management technique
      const userLogin =useAuthStore(state=>state.login);

  const signUp = async (inputs) => {
    if (!inputs.email || !inputs.password || !inputs.username || !inputs.fullName) {
      // console.log("Please fill all the fields");
      showToasta("Error","please fill all the field","error");
      return;
    }
      

   //here i check this username already exist in database or not 
   //if exist show error
   //else allow 
    const userRef = collection(firestore, "users"); 
   // Create a query against the collection.
   const q = query(userRef, where("username", "==", inputs.username));
// The following query returns all users which user name match as input
   const querySnapshot = await getDocs(q);
   if(!querySnapshot.empty){
    showToasta("Error","username already exists","error");
   }

    try {
      const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
      // console.log("New user created:", newUser);

      if (!newUser) {
        // console.log("Error creating user:", error);
        showToasta("Error",error.message,"error");
        return;
      }

      const userDoc = {
        uid: newUser.user.uid,
        email: inputs.email,
        username: inputs.username,
        fullName: inputs.fullName,
        bio: "",
        profilePicUrl: "",
        followers: [],
        following: [],
        posts: [],
        createdAt: Date.now(),
      };
        //create database in firestore
      await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
      // console.log("User document created in Firestore:", userDoc);
       //local storage for conformation
      localStorage.setItem("user-info", JSON.stringify(userDoc));
      //send param to authStore
      userLogin(userDoc);
      console.log("User info saved to local storage");
      
    } catch (error) {
      console.log("Error during sign-up process:", error);
      showToasta("Error",error.message,"error");
    }
  };

  return { loading, error, signUp };
}

export default useSignUpWithEmailPassword;
