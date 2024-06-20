import { Avatar, AvatarGroup, Button, Flex, Text, VStack, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import useAuthStore from '../store/authStore';
import EditProfileComponent from './EditProfileComponent';
import useFollowUser from '../hooks/useFollowUser';
import useUserProfileStore from '../store/userProfileStore';

function ProfileHeaderComponent() {
  const { userProfile} = useUserProfileStore();
  const authUser = useAuthStore(state => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {isFollowing,isUpdating,handleFollowUser} = useFollowUser(userProfile?.uid);
    
  // if (profileLoading || !userProfile) {
  //   return <Text>Loading...</Text>;
  // }

  const visitOwnProfileAuth = authUser && authUser.username === userProfile.username;
  const visitAnotheruserProfileAuth = authUser && authUser.username !== userProfile.username;

  return (
    <Flex direction={{ base: 'column', md: 'row' }} gap={{ base: 4, sm: 10 }} py={10} alignItems="center">
      <AvatarGroup size={{ base: 'xl', md: '2xl' }} justifyContent="center">
        <Avatar name={userProfile.username} src={userProfile.profilePicUrl} alt="profile logo" />
      </AvatarGroup>
      <VStack alignItems={{ base: 'center', md: 'flex-start' }} gap={2} mx="auto" flex={1} textAlign={{ base: 'center', md: 'left' }}>
        <Flex direction={{ base: 'column', sm: 'row' }} gap={4} justifyContent={{ base: 'center', sm: 'flex-start' }} alignItems="center" w="full">
          <Text fontSize={{ base: 'lg', md: '2xl' }} fontWeight="bold">{userProfile.username}</Text>
          {visitOwnProfileAuth && (
            <Flex gap={4} alignItems="center" justifyContent="center">
              <Button onClick={onOpen} bg="white" color="black" _hover={{ bg: 'whiteAlpha.800' }} size={{ base: 'sm', md: 'md' }}>
                Edit Profile
              </Button>
            </Flex>
          )}
          {visitAnotheruserProfileAuth && (
            <Flex gap={4} alignItems="center" justifyContent="center">
              <Button bg="blue.500" color="white" _hover={{ bg: 'whiteAlpha.800', color: 'black' }} size={{ base: 'sm', md: 'md' }} onClick={handleFollowUser} isLoading={isUpdating}>
                { isFollowing ? "Unfollow" : "Follow"}
              </Button>
            </Flex>
          )}
        </Flex>
        <Flex gap={{ base: 2, sm: 4 }} alignItems="center">
          <Text fontSize={{ base: 'sm', md: 'md' }}>
            <Text as="span" fontWeight="bold">{userProfile.posts.length}</Text> Posts
          </Text>
          <Text fontSize={{ base: 'sm', md: 'md' }}>
            <Text as="span" fontWeight="bold">{userProfile.followers.length}</Text> Followers
          </Text>
          <Text fontSize={{ base: 'sm', md: 'md' }}>
            <Text as="span" fontWeight="bold">{userProfile.following.length}</Text> Following
          </Text>
        </Flex>
        <Flex direction="column" alignItems="flex-start" mt={2} fontSize={{ base: 'sm', md: 'md' }}>
          <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight="bold">{userProfile.fullName}</Text>
          <Text>{userProfile.bio}</Text>
        </Flex>
      </VStack>
      {isOpen && <EditProfileComponent isOpen={isOpen} onClose={onClose} />}
    </Flex>
  );
}

export default ProfileHeaderComponent;
