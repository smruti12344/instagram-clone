import {  useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import useShowToasta from './useShowToasta';
import useAuthStore from '../store/authStore';
// import { Navigate } from 'react-router-dom';

function useLogOut() {
    const [signOut, isLoggingOut, signOutError] = useSignOut(auth);
    const showToasta = useShowToasta();
    const logoutUser = useAuthStore(state=>state.logout);


    const handleLogOut = async () => {
        try {
            await signOut();
            localStorage.removeItem('user-info');
            logoutUser();
            console.log("Logged out successfully");
            showToasta('logOUt','user logout successfully','success');
            // Navigate('/auth');
        } catch (error) {
            showToasta('Error', error.message, 'error');
        }
    };

    return { handleLogOut, isLoggingOut, signOutError };
}

export default useLogOut;
