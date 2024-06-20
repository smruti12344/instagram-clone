import { Box, Container, Flex, Skeleton, SkeletonCircle, VStack,Text } from '@chakra-ui/react'
// import React, { useEffect, useState } from 'react'
import FeedPostComponent from './FeedPostComponent';
import useGetFeedPost from '../hooks/useGetFeedPost';

function FeedPosts() {
  //for loading style
 const {isloading,posts} = useGetFeedPost();
  return (

   <Container maxW={"container.sm"} py={10} px={2}>
    {isloading && [0,1,2,3].map((_,idx)=>(
      <VStack key={idx} gap={4} alignItems={"flex-start"} mb={10}>
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
    ))}
        {/* if not loading */}
        {!isloading && posts.length>0 && posts.map((post)=>(
          <FeedPostComponent key={post.id} post={post} />
        )) 
        
        }
         {!isloading && posts.length === 0 && (
          <>
           <Text fontSize={"md"} color={"red.400"}>Hello user Looks like you don&apos;t have any friends.</Text>
           <Text color={"red.400"}>Stop coding and find someone to be friend !!</Text>
          </>
         ) 
        
        }
   </Container>
  )
}

export default FeedPosts;
