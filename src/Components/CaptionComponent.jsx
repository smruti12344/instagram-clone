import React from 'react'
import { timePost } from '../utils/timePost'
import { Avatar, Flex, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import useUserProfileStore from '../store/userProfileStore'

function CaptionComponent({post}) {
    const userProfile = useUserProfileStore(state => state.userProfile);
  return (
    <Flex gap={4}>
    <Link to={`/${userProfile.username}`} >
    <Avatar src={userProfile?.profilePicUrl} size="sm" />
    </Link>
     <Flex flexDir="column">
       <Flex gap={2}>
         <Link to={`/${userProfile.username}`}>
         <Text fontWeight="bold" fontSize={12}>
           {userProfile?.username}
         </Text>
         </Link>
         <Text fontSize={14}>{post.caption}</Text>
       </Flex>
       <Text fontSize={12} color="gray">
         {timePost(post.createdAt)}
       </Text>
     </Flex>
   </Flex>
  )
}

export default CaptionComponent
