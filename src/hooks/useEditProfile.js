import React, { useState } from 'react';
import useAuthStore from '../store/authStore';
import useShowToasta from './useShowToasta';
import { firestore, storage } from '../firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, uploadString, ref } from 'firebase/storage';
import useUserProfileStore from '../store/userProfileStore';

function useEditProfile() {
  const [isUpdating, setUpdating] = useState(false);
  const authUser = useAuthStore(state => state.user);
  const setAuthUser = useAuthStore(state => state.setUser);
  const setUserProfile = useUserProfileStore(state => state.setUserProfile);
  const showToast = useShowToasta();

  const editProfile = async (inputs, selectImg) => {
    if (isUpdating || !authUser) {
      return;
    }

    setUpdating(true);
    // uploading img to firebase
    //storage : This is likely an instance of your Firebase Storage service. It's used to interact with Firebase Storage
    //ref : This is a function from the Firebase Storage library that creates a reference to a specific location in your Firebase Storage
    //profilePics/${authUser.uid}:This is the path within your Firebase Storage where you want to store the user's profile picture.
    // profilePics is a directory in your storage bucket.
    //${authUser.uid} is a template literal in JavaScript that dynamically inserts the uid (user ID) of the authenticated user (authUser).
    // This makes the path unique for each user, so each user's profile picture is stored in a unique location based on their user ID.

    const storageRef = ref(storage, `profilePics/${authUser.uid}`);
     //This variable now holds a reference to the document located at users/{user_id} in your Firestore database.
    const userDocRef = doc(firestore, "users", authUser.uid);
     // URL: This declares a constant variable URL that will hold the download URL of the file once it is retrieved.
    let URL = "";

    try {
      if (selectImg) {
        //"data_url":This is the format of the string being uploaded. The "data_url" format indicates that the string is a data URL (base64 encoded)
        await uploadString(storageRef, selectImg, "data_url");
        //getDownloadURL:This is a function from the Firebase Storage library 
            //(typically from the @firebase/storage or firebase/storage module). 
            //It retrieves the download URL for a file stored at a given reference in Firebase Storage.
        URL = await getDownloadURL(storageRef);
          //const URL = await getDownloadURL(ref(storage, profilePics/${authUser.uid}));:
               //This line creates a reference to the file stored at profilePics/{user_id} in Firebase Storage.
      }

      const updatedUser = {
        ...authUser,
        fullName: inputs.fullName || authUser.fullName,
        username: inputs.username || authUser.username,
        bio: inputs.bio || authUser.bio,
        profilePicUrl: URL || authUser.profilePicUrl,
      };

      await updateDoc(userDocRef, updatedUser);
      localStorage.setItem("user-info", JSON.stringify(updatedUser));
      setAuthUser(updatedUser);
      setUserProfile(updatedUser);
      showToast("Success", "Profile updated successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setUpdating(false);
    }
  };

  return { editProfile, isUpdating };
}

export default useEditProfile;
