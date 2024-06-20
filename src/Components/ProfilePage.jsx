import { Link as RouterLink, useParams } from 'react-router-dom';
import { Container, Flex, Skeleton, SkeletonCircle, Text, VStack, Link } from '@chakra-ui/react';
import ProfileHeaderComponent from './ProfileHeaderComponent';
import ProfileTabComponent from './ProfileTabComponent';
import ProfilePostsComponent from './ProfilePostsComponent';
import useGetUserProfileByusername from '../hooks/useGetUserProfileByusername';


function ProfilePage() {
  // username from url
  const { username } = useParams();
  const { isLoading, userProfile } = useGetUserProfileByusername(username);
  // user-profile not found
  const userNotFound = !isLoading && !userProfile;


  if (userNotFound) {
    return <UserNotFound />
  }

  return (
    <Container maxW={"container.lg"} py={5}>
      <Flex  py={10} px={4} pl={{ base: 4, md: 10 }} w={"full"} mx={"auto"} flexDirection={"column"} >
        {!isLoading && userProfile && <ProfileHeaderComponent />}
        {isLoading && <ProfileHeaderSkeleton />}
       
      </Flex>

      <Flex px={{ base: 2, sm: 4 }} maxW={"full"} mx={"auto"} borderTop={"1px solid"} borderColor={"whiteAlpha.300"} direction={"column"}>
        <ProfileTabComponent />
        <ProfilePostsComponent />
      </Flex>
    </Container>
  );
}

export default ProfilePage;

// skeleton for profileHeader


const ProfileHeaderSkeleton = () => {
  return (
    <Flex gap={{ base: 4, sm: 10 }} py={10} direction={{ base: "column", sm: "row" }} justifyContent="center" alignItems="center">
      <SkeletonCircle size={{ base: "14", md: "16" }} />
      <VStack alignItems={{ base: "center", sm: "flex-start" }} gap={2} mx="auto" flex={1}>
        <Skeleton height="12px" width="150px" />
        <Skeleton height="12px" width="150px" />
      </VStack>
    </Flex>
  );
}




// userNotFound component
const UserNotFound = () => {
  return (
    <Flex flexDir={'column'} textAlign={'center'} mx={'auto'}>
      <Text fontSize={'2xl'} color={'red'}>User Not Found!</Text>
      <Link as={RouterLink} to={"/"} color={"blue.500"} w={"max-content"} mx={"auto"}>Go home</Link>
    </Flex>
  );
}
