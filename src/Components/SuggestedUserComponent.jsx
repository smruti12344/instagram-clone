import { Avatar, Box, Button, Flex, Text, VStack,Link } from '@chakra-ui/react'
import useFollowUser from '../hooks/useFollowUser';
import useAuthStore from '../store/authStore';
import { Link as RouterLink } from 'react-router-dom';

function SuggestedUserComponent({user,setUser}) {
  if (!user) {
    // Early return if user is not defined
    return null;
  }
  // configure state for followers
const {isFollowing, isUpdating, handleFollowUser} = useFollowUser(user.uid);
const authUser = useAuthStore(state => state.user);

async function handleFollowed(){
  await handleFollowUser();
  setUser({
    ...user,
    followers : isFollowing ? user.followers.filter((userfollowers)=> userfollowers.uid !== authUser.uid) : [...user.followers,authUser],
  });
}
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
     <Flex  gap={2} >
      <Avatar src={user.profilePicUrl} name={user.username} size={"md"}/>
      <VStack spacing={2} alignItems={"flex-start"}>
        <Text fontSize={12} fontWeight={"bold"} >
          <Link to={user.username} as={RouterLink}>{user.fullName}</Link>
        </Text>
        <Box fontSize={11} color={"gray.500"}>{user.followers.length} followers</Box>
      </VStack>
     </Flex>
     {/* //restrict followers button for own profile */}
      {authUser.uid !== user.uid && (
        <Button onClick={handleFollowed} fontSize={13} bg={"transparent"} p={0} h={"max-content"} fontWeight={"medium"} color={"blue.500"} _hover={{color:"white"}} isLoading={isUpdating}>
        {isFollowing?"Unfollow":"Follow"}
      </Button>
      )}
    </Flex>
  )
}

export default SuggestedUserComponent
