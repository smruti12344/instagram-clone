import { Flex, GridItem, Image, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Box, Avatar, Divider, VStack, Button } from '@chakra-ui/react';
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import CommentComponent from './CommentComponent';
import FeedPostFooterComponent from './FeedPostFooterComponent';
import useUserProfileStore from '../store/userProfileStore';
import useAuthStore from '../store/authStore';
import useShowToasta from '../hooks/useShowToasta';
import useDeletePost from '../hooks/useDeletePost';
import CaptionComponent from './CaptionComponent';

function ProfilePostComponent({ post }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userProfile = useUserProfileStore(state => state.userProfile);
  const authUser = useAuthStore(state => state.user);
  const showToast = useShowToasta();
  const { handleDeletePost, isDeleting } = useDeletePost();
  const decrementPostCount = useUserProfileStore(state => state.deletePost);

  const handleDeletePosts = async () => {
    try {
      await handleDeletePost(post.id, authUser.uid);
      decrementPostCount(post.id);
      showToast("Success", "Post removed successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  }

  return (
    <>
      <GridItem
        onClick={onOpen}
        cursor="pointer"
        borderRadius={4}
        overflow="hidden"
        border="1px solid"
        borderColor="whiteAlpha.300"
        position="relative"
        aspectRatio={1}
        m={2}
      >
        <Flex
          opacity={0}
          _hover={{ opacity: 1 }}
          position="absolute"
          top={0}
          left={0}
          bottom={0}
          right={0}
          bg="blackAlpha.700"
          transition="all 0.3s ease"
          zIndex={1}
          justifyContent="center"
        >
          <Flex alignItems="center" justifyContent="center" gap={5}>
            <Flex alignItems="center">
              <AiFillHeart size={20} />
              <Text fontWeight="bold" ml={2}>{post.likes.length}</Text>
            </Flex>
            <Flex alignItems="center">
              <FaComment size={20} />
              <Text fontWeight="bold" ml={2}>{post.comments.length}</Text>
            </Flex>
          </Flex>
        </Flex>
        <Image src={post.imageUrl} alt="user post" w="100%" h="100%" objectFit="cover" />
      </GridItem>

      <Modal blockScrollOnMount={false} size={{ base: "3xl", md: "5xl" }} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader />
          <ModalCloseButton />
          <ModalBody bg="black" pb={5}>
            <Flex gap={4} w={{ base: "90%", sm: "70%", md: "full" }} mx="auto" maxH="90vh" minH="50vh">
              <Flex justifyContent="center" alignItems="center" borderRadius={6} overflow="hidden" border="1px solid" borderColor="whiteAlpha.300" flex={1.5}>
                <Image src={post.imageUrl} alt="user post" />
              </Flex>
              <Flex flex={1} flexDir="column" px={10} display={{ base: "none", md: "flex" }}>
                <Flex alignItems="center" justifyContent="space-between">
                  <Flex alignItems="center" gap={4}>
                    <Avatar name={userProfile.fullName} src={userProfile.profilePicUrl} size="sm" />
                    <Text fontWeight="bold" fontSize={12}>{userProfile.fullName}</Text>
                  </Flex>
                  {authUser?.uid === userProfile.uid && (
                    <Button onClick={handleDeletePosts} isLoading={isDeleting} size="sm" bg="transparent" _hover={{ bg: "whiteAlpha.300", color: "red.600" }} borderRadius={4} p={1}>
                      <MdDelete cursor="pointer" />
                    </Button>
                  )}
                </Flex>
                <Divider my={4} bg="gray.500" />
                <VStack w="full" align="start" maxH="350px" overflow="auto">
                  {/* CAPTION */}
                  {post.caption && <CaptionComponent post={post} />}
                  {/* COMMENTS */}
                 {post.comments.map((comment,idx )=>(
                  <CommentComponent key={idx} comment={comment}/>
                 ))}
                </VStack>
                <Divider my={4} bg="gray.800" />
                <FeedPostFooterComponent isProfilePage={true} post={post} />
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProfilePostComponent;
