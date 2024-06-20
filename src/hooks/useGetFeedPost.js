import React, { useEffect, useState } from 'react'
import usePostStore from '../store/PostStore';
import useAuthStore from '../store/authStore';
import useShowToasta from './useShowToasta';
import useUserProfileStore from '../store/userProfileStore';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

function useGetFeedPost() {
    // State to track loading status
    const [isLoading, setIsLoading] = useState(true);
    // Get posts and setPosts function from custom post store
    const { posts, setPosts } = usePostStore();
    // Get authenticated user from custom auth store
    const authUser = useAuthStore(state => state.user);
    // Get showToast function from custom toast hook
    const showToast = useShowToasta();
    // Get setUserProfile function from custom user profile store
    const setUserProfile = useUserProfileStore(state => state.setUserProfile);

    useEffect(() => {
        // Function to fetch feed posts
        const getFeedPost = async () => {
            setIsLoading(true); // Set loading state to true
            // If the user is not following anyone, set loading to false and posts to an empty array
            if (authUser.following.length === 0) {
                setIsLoading(false);
                setPosts([]);
                return;
            }

            // Create a query to fetch posts created by users that the authUser is following
            const q = query(collection(firestore, "posts"), where("createdBy", "in", authUser.following));
            try {
                // Execute the query and get the documents
                const querySnapshot = await getDocs(q);
                const feedPosts = [];
                querySnapshot.forEach((doc) => {
                    // Push each document data into the feedPosts array with the document ID
                    feedPosts.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                // Sort posts by createdAt in descending order
                feedPosts.sort((a, b) => b.createdAt - a.createdAt);
                // Update the posts state with the sorted feedPosts
                setPosts(feedPosts);
            } catch (error) {
                // Show error toast if an error occurs
                showToast("Error", error.message, "error");
            } finally {
                setIsLoading(false); // Set loading state to false
            }
        };

        // If an authenticated user exists, fetch the feed posts
        if (authUser) {
            getFeedPost();
        }
    }, [setPosts, setUserProfile, authUser, showToast]); // Dependency array to re-run effect when these values change

    return { isLoading, posts }; // Return loading state and posts
}


export default useGetFeedPost
