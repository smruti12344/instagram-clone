import React from 'react'
import { Flex,Image,Text } from '@chakra-ui/react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import useAuthStore from '../store/authStore';
import useShowToasta from '../hooks/useShowToasta';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, firestore } from '../firebase/firebase';

function GoogleAuthComponent({prefix}) {
  // access hook for signin using google
  const [signInWithGoogle,  error] = useSignInWithGoogle(auth); 
  //store user details
  const loginUser = useAuthStore(state=>state.login);
  //displaying message
        
  const showToast=useShowToasta();
  const handleGoogleAuth = async ()=>{
    try {
      const newUser = await signInWithGoogle();
      if(!newUser && error){
        showToast("Error",error.message,"error");
        return;
      }
      // retrieve the contents of a single document using get()
      const docRef = doc(firestore, "users", newUser.user.uid);
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()){
        //login
        const userDoc = docSnap.data();
        localStorage.setItem("user-info",JSON.stringify(userDoc));
        loginUser(userDoc);
        console.log(userDoc); 

      }
      else{
        //signUp
         //sav user data
      const userDoc = {
        uid: newUser.user.uid,
        email: newUser.user.email,
        username: newUser.user.email.split("@")[0],
        fullName: newUser.user.displayName,
        bio: "",
        profilePicUrl: newUser.user.photoURL,
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
      }
     
      
    } catch (error) {
      showToast("Error",error.message,"error");
    }
  }
  return (
    <Flex cursor={"pointer"} onClick={handleGoogleAuth}>
    <Image src='https://cdn.pixabay.com/photo/2015/12/11/11/43/google-1088004_1280.png' w={5} alt='google logo'/>
    <Text mx={"2"} color={"blue.500"}>{prefix} with Google</Text>
   </Flex>
  )
}

export default GoogleAuthComponent
