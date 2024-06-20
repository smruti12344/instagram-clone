import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Flex,
    Divider,
    VStack,
    Text,
  } from '@chakra-ui/react'
import CaptionComponent from '../Components/CaptionComponent'
import CommentComponent from '../Components/CommentComponent'
import FeedPostFooterComponent from '../Components/FeedPostFooterComponent'
import { useEffect, useRef } from 'react'
function CommentModals({ isOpen, onClose, post}) {
  const commentContainerRef = useRef(null);
    useEffect(()=>{
   const scrollToBottom = ()=>{
    // This code sets the vertical scroll position (scrollTop) of the container to its maximum scroll height (scrollHeight).
    commentContainerRef.current.scrollTop = commentContainerRef.current.scrollHeight;
   };
   if(isOpen){
    setTimeout(()=>{
    scrollToBottom();
    },1000)
   }
    },[isOpen,post.comments.length])
    return (
      <>
        <Modal blockScrollOnMount={false} size={{ base: "3xl", md: "xl" }} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader />
          <ModalCloseButton />
          <ModalBody bg="black" pb={5}>
            <Flex gap={4} w={{ base: "90%", sm: "70%", md: "full" }} mx="auto" maxH="90vh" minH="50vh">
              <Flex flex={1} flexDir="column" px={10} display={{ base: "none", md: "flex" }}>
                  <Text textAlign={"center"}>All Comments</Text>
                <Divider my={4} bg="gray.500" />
                <VStack w="full" align="start" maxH="350px" overflow="auto" ref={commentContainerRef}>
                  {/* COMMENTS */}
                 {post.comments.map((comment,idx )=>(
                  <CommentComponent  key={idx} comment={comment}/>
                 ))}
                </VStack>
                <Divider my={4} bg="gray.800" />
                <FeedPostFooterComponent isCommentModal={true} isProfilePage={true} post={post} />
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      </>
    )
}

export default CommentModals
