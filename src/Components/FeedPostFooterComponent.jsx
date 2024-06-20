import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text, useDisclosure } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import NotificationLogoComponent from './LikeLogoComponent';
import UnlikeLogoComponent from './UnlikeLogoComponent';
import CommentLogoComponent from './CommentLogoComponent';
import SendLogoComponent from './SendLogoComponent';
import usePostComment from '../hooks/usePostComment';
import useAuthStore from '../store/authStore';
import useLikePost from '../hooks/useLikePost';
import { timePost } from '../utils/timePost';
import CommentModals from '../modals/CommentModals';


const FeedPostFooterComponent = ({post,isProfilePage,creatorProfile,isCommentModal}) => {
  const {isCommenting,handleComment} = usePostComment();
   //get sate for coomenting
   const [commentText,setCommentText] = useState('');
  //get stae for authenticate user from AuthStore
  const authUser = useAuthStore(state => state.user);
  const {isUpdating,isLiked,likes,handleLikePost} = useLikePost(post);
   //comment logo function
   const commentRef = useRef(null);
   //modal design
    const{ isOpen, onOpen, onClose }=useDisclosure();
   //handleComment function
   const handleSubmitComment = async ()=>{
    if (commentText.trim() === '') {
      // Handle empty comment
      return;
  }

  // Call your hook function to handle posting comment
  await handleComment(post.id, commentText);

  // Clear commentText after posting
  setCommentText('');
  }
 
 
  return (
   <Box mb={10} marginTop={"auto"}>
    {!isCommentModal && <>
      <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={2}>
    <Box onClick={handleLikePost} cursor={"pointer"} fontSize={20} isLoading={isUpdating}>
      {isLiked ?(<NotificationLogoComponent/>):(<UnlikeLogoComponent/>)}
    </Box>
    <Box onClick={()=> commentRef.current.focus()} cursor={"pointer"} fontSize={18}>
      <CommentLogoComponent/>
    </Box>
    <Box cursor={"pointer"} fontSize={18}>
      <SendLogoComponent/>
    </Box>

   </Flex>

   <Text>
    {likes} likes
   </Text>
   {
    isProfilePage && (
      <Text fontSize={12} color={"gray"}>Posted {timePost(post.createdAt)}</Text>
    )
   }
   {
   !isProfilePage && (
      <>
       <Text fontSize={"sm"} fontWeight={700}>
    {creatorProfile.username}{" "}
    <Text as={"span"} fontWeight={400}>{post.caption}</Text>
   </Text>
   {post.comments.length>0 && (
    <Text fontSize={"sm"} color={"gray"} onClick={onOpen} cursor={"pointer"}>View all {post.comments.length} comments</Text>
   )}
   {/* COMMENT MODAL FOR HOME PAGE */}
   {isOpen ? <CommentModals isOpen={isOpen} onClose={onClose} post={post} /> : null}
      </>
    )
   }
    
     </>}
  
  {authUser && (
     <Flex alignItems={"center"} gap={2} justifyContent={"center"} w={"full"} mb={2}>
     <InputGroup>
      <Input onChange={(e)=>setCommentText(e.target.value)} value={commentText} variant={"flushed"} placeholder='add a comment...' fontSize={14} ref={commentRef} />
      <InputRightElement>
     <Button onClick={handleSubmitComment} fontSize={14} color={"blue.500"} fontWeight={600} cursor={"pointer"} _hover={{color:"white"}} bg={"transparent"} isLoading={isCommenting}>Post</Button>
     </InputRightElement>
     </InputGroup>
    
    </Flex>
  )}
   </Box>
  )}

export default FeedPostFooterComponent
