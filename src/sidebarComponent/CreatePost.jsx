import { Box, Button, CloseButton, Flex, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, Tooltip, useDisclosure } from "@chakra-ui/react"
import { FaRegPlusSquare } from "react-icons/fa";
import { BsFillImageFill } from "react-icons/bs";
import { useRef, useState } from "react";
import usePreviewImg from "../hooks/usePreviewImg";
import useShowToasta from "../hooks/useShowToasta";
import usePostStore from "../store/PostStore";
import useUserProfileStore from "../store/userProfileStore";
import { useLocation } from "react-router-dom";
import { addDoc, arrayUnion, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore, storage } from "../firebase/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import useAuthStore from "../store/authStore";
function CreatePost() {
  const {isOpen,onOpen,onClose} = useDisclosure();
  const[caption,setCaption] = useState("");
  const imgRef = useRef(null);
  const { selectImg, handleImgChange, setSelectImg } = usePreviewImg();
  const showToast = useShowToasta();
  const {isLoading,handleCreatePost} = useCreatePost();

  const handlePostCreation = async()=>{
    try {
      await handleCreatePost(selectImg, caption);
      onClose();
      setCaption("");
      setSelectImg(null);
       
    } catch (error) {
      showToast("Error",error.message,"error");
    }
  }
  return (
    <>
    <Tooltip label={"Create"} hasArrow ml={1}  placement={"right"} openDelay={500} display={{base:"block",md:"none"}}>
    <Flex onClick={onOpen} alignItems={"center"} gap={4} _hover={{bg:"whiteAlpha.400"}} borderRadius={6} p={2} w={{base:10, md:"full"}} justifyContent={{base:"center",md:"flex-start"}}>

    <FaRegPlusSquare size={20} />
    <Box display={{base:"none",md:"block"}}>Create</Box>
    </Flex>
  </Tooltip>
   {/* modeal for post */}
   <Modal isOpen={isOpen} onClose={onClose} size={"xl"}  >
    <ModalOverlay/>
    <ModalContent   border={"1px solid gray"}>
    <ModalHeader  textAlign={"center"} borderBottom={"1px solid gray"} fontWeight={"bold"}>Create new Post</ModalHeader>
    <ModalCloseButton/>
    <ModalBody pb={6}>
      <Textarea color={"white"} placeholder="Post Caption..." value={caption}
      onChange={(e)=>setCaption(e.target.value)} />
      <Input type="file" ref={imgRef} hidden onChange={handleImgChange} />
      <BsFillImageFill onClick={()=> imgRef.current.click()} style={{marginTop:"15px",marginLeft:"5px",cursor:"pointer"}} size={20} />
      {selectImg && (
        <Flex mt={5} w={"full"} position={"relative"} justifyContent={"center"}  >
          <Image src={selectImg} alt="selected img" />
          <CloseButton position={"absolute"} top={2} right={2} onClick={()=> setSelectImg(null)} />
        </Flex>
      )}
    </ModalBody>
    <ModalFooter>
      <Button mr={3} onClick={handlePostCreation} isLoading={isLoading} >Post</Button>
    </ModalFooter>
    </ModalContent>
   
   </Modal>
    </>
  )
}

export default CreatePost

function useCreatePost() {
  // Get the showToast function from useShowToasta hook for displaying notifications
  const showToast = useShowToasta();
  // State to manage loading state
  const [isLoading, setIsLoading] = useState(false);
  // Get the authenticated user from the auth store
  const authUser = useAuthStore(state => state.user);
  // Get the createPost function from the post store to create a new post
  const createPost = usePostStore(state => state.createPost);
  // Get the addPost function from the user profile store to add a post to the user profile
  const addPost = useUserProfileStore(state => state.addPost);
  //get the state for restrict user to post in another userprofile
  const userProfile = useUserProfileStore(state => state.userProfile);
  // Get the current pathname from the location
  const { pathName } = useLocation();

  // Function to handle the creation of a post
  const handleCreatePost = async (selectImg, caption) => {
    if(isLoading) return;
    // Check if an image is selected
    if (!selectImg) {
      throw new Error("Please select an image");
    }
    // Set loading state to true
    setIsLoading(true);

    // Create a new post object with initial values
    const newPost = {
      caption: caption,
      likes: [],
      comments: [],
      share: [],
      createdAt: Date.now(),
      createdBy: authUser.uid,
    };

    try {
      // Add a new document to the "posts" collection in Firestore and get the document reference
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);

      // Create a reference to the authenticated user's document in the "users" collection in Firestore
      const userDocRef = doc(firestore, "users", authUser.uid);

      // Create a reference to the image location in Firebase Storage
      const imgRef = ref(storage, `posts/${postDocRef.id}`);

      // Update the user's document to include the new post ID in the posts array
      await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });

      // Upload the selected image as a base64-encoded string to Firebase Storage
      await uploadString(imgRef, selectImg, "data_url");

      // Get the download URL for the uploaded image
      const downloadUrl = await getDownloadURL(imgRef);

      // Update the post document in Firestore to include the image URL
      await updateDoc(postDocRef, { imageUrl: downloadUrl });

      // Update the new post object with the image URL
      newPost.imgUrl = downloadUrl;

      // Create the post in the local state with the updated new post object
      if(userProfile.uid === authUser.uid){
        createPost({ ...newPost, id: postDocRef.id });
      }
      if(pathName !== "/" && userProfile.uid === authUser.uid){
         // Add the post to the user profile
     
      addPost({...newPost,id:postDocRef.id});
      }

     
      showToast("Success","post created successfully","success");
    } catch (error) {
      // Show an error toast notification if an error occurs
      showToast("Error", error.message, "error");
    } finally {
      // Set loading state to false
      setIsLoading(false);
    }
  };
  
  // Return the handleCreatePost function and the loading state
  return { handleCreatePost, isLoading };
}
