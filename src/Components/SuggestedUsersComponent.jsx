import { Box, Flex, Text, VStack, Link, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import React from 'react'
import SuggestedHeaderComponent from './SuggestedHeaderComponent'
import SuggestedUserComponent from './SuggestedUserComponent'
import useGetSuggestedUser from '../hooks/useGetSuggestedUser'



function SuggestedUsersComponent() {
  const {isLoading , suggestedUsers} = useGetSuggestedUser();

  return (

   <VStack py={8} px={6} gap={4}>
      <SuggestedHeaderComponent/>
      {isLoading && <SuggestedUsersSkeleton/>}
     {suggestedUsers.length !==0 && (

<Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
<Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>Suggested for you</Text>
<Text fontSize={12} fontWeight={"bold"} cursor={"pointer"} _hover={{color:"gray.400"}}>See All</Text>
</Flex>
     )}
      {/* send value to other component */}
      {
        suggestedUsers.map(user => (
          <SuggestedUserComponent user={user} key={user.id}  />
        ))
      }
      <Box fontSize={12} color={"gray.500"} mt={5}>
        &copy; 2024 Build by {" "}
        <Link href='https://www.instagram.com/s_r_sahoo1/?hl=en' target='_blank' color='blue.500' fontSize={14}>Smruti Ranjan Sahoo</Link>
      </Box>
   </VStack>
  )
}

export default SuggestedUsersComponent
 
const SuggestedUsersSkeleton = ()=>{
  return(
    <>
 <Box padding={4} boxShadow='lg' ml={0}  >
  <Flex justifyContent={"flex-start"} alignItems={"center"}>
    
  <SkeletonCircle size='10' />
   <SkeletonText m='2' noOfLines={2} spacing='2' skeletonHeight='2' width={20} />
  </Flex>
  
 
</Box>
  
 

  </>
  )
}