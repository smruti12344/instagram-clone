import { create } from "zustand";

const useUserProfileStore = create((set) => ({
  userProfile: null, // Initialize the userProfile state
  setUserProfile: (userProfile) => set({ userProfile }), // Correctly set the userProfile state
  // This is used to update the number of posts in the user-profile page
  addPost: (post) => set((state) => {
    if (!state.userProfile) return {}; // Check if userProfile is not null
    return {
      userProfile: {
        ...state.userProfile,
        posts: [post.id, ...(state.userProfile.posts || [])] // Add new post then add existing posts
      }
    };
  }),
  deletePost: (postId) => set((state) => {
    if (!state.userProfile) return {}; // Check if userProfile is not null
    return {
      userProfile: {
        ...state.userProfile,
        posts: (state.userProfile.posts || []).filter(id => id !== postId) // Filter out the post by postId
      }
    };
  })
}));

export default useUserProfileStore;
