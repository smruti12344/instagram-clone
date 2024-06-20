import React from 'react'
import FeedPostHeaderComponent from './FeedPostHeaderComponent'
import { Box, Flex, Image, Skeleton, SkeletonCircle, VStack } from '@chakra-ui/react'
import FeedPostFooterComponent from './FeedPostFooterComponent'
import useGetProfileById from '../hooks/useGetProfileById'

function FeedPostComponent({post}) {
  const{isLoading,userProfile}=useGetProfileById(post.createdBy);
  return (
   <>
    {isLoading && <FeedPostSkeleton/>}
    {!isLoading && <>
      <FeedPostHeaderComponent post={post} creatorProfile ={userProfile} />
      <Box my={2} borderRadius={4} overflow={"hidden"}>
      <Image src={post.imageUrl} alt='feed post image' w={"full"} />
    </Box>
    <FeedPostFooterComponent post={post} creatorProfile ={userProfile}  isProfilePage={false}/>
    </>}
    
   </>
  )
}

export default FeedPostComponent

const FeedPostSkeleton = ()=>{
  return(

    <VStack  gap={4} alignItems={"flex-start"} mb={10}>
        <Flex gap={2}>
          {/* header-component loding effect */}
          <SkeletonCircle size='10' />
          <VStack gap={2} alignItems={"flex-start"}>
            {/* body-component loading effect */}
            <Skeleton height={'10px'} w={"200px"}/>
            <Skeleton height={'10px'} w={"150px"}/>
          </VStack>
        </Flex>
        <Skeleton w={"full"}>
          <Box h={"500px"}>contents wrapped</Box>
        </Skeleton>
      </VStack>
  )
}