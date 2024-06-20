import { useEffect, useState } from 'react';
import useShowToasta from './useShowToasta';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import useUserProfileStore from '../store/userProfileStore';

function useGetUserProfileByusername(username) {
  const [isLoading, setLoading] = useState(true);
  const showToast = useShowToasta();
  const { userProfile, setUserProfile } = useUserProfileStore();

  useEffect(() => {
    const getUserProfile = async () => {
      setLoading(true);
      try {
        const q = query(collection(firestore, "users"), where("username", "==", username));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setUserProfile(null); // No user profile found
        } else {
          let userDoc;
          querySnapshot.forEach(doc => {
            userDoc = doc.data();
          });
          setUserProfile(userDoc); // Store user data in userProfile store
        //   console.log(userProfile);
        }
      } catch (error) {
        showToast("Error", error.message, 'error');
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      getUserProfile();
    }
  }, [username, showToast, setUserProfile]);

  return { isLoading, userProfile };
}

export default useGetUserProfileByusername;
