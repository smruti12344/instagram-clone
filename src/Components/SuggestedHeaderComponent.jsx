import { Avatar, Box, Flex, Text, Button } from '@chakra-ui/react'
import React from 'react'
import useLogOut from '../hooks/useLogOut'
import useAuthStore from '../store/authStore';
import { Link } from 'react-router-dom';

function SuggestedHeaderComponent() {
  // access useLogout hook for signout
  const{handleLogOut,isLoginOut}= useLogOut();
  // access authStore to display according to user post
      const authUser=useAuthStore(state=>state.user);

  // Check if authUser is defined before rendering
  if (!authUser) {
    return null; // Or a loading spinner or placeholder if preferred
  }
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
     <Link to={`/${authUser.username}`}>
     <Avatar  name={authUser.username} src={authUser.profilePicUrl} />
     </Link>
      <Flex flexDir={"column"}>
      <Link to={`/${authUser.username}`}>
      <Text fontSize={12} fontWeight={"bold"} >{authUser.username}</Text>
      </Link>
      <Text fontSize={12} textTransform={"capitalize"}>{authUser.fullName}</Text>
      </Flex>

      </Flex>
      <Button size={"xs"} isLoading={isLoginOut} background={"transparent"} _hover={{background:"transparent"}}  fontSize={14} fontWeight={"medium"} color={"blue.400"}  cursor={"pointer"} onClick={handleLogOut} > logout</Button>
     
    </Flex>
  )
}

export default SuggestedHeaderComponent
