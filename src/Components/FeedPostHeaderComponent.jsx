import { Avatar, Box, Button, Flex,Text  } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import useFollowUser from '../hooks/useFollowUser';
import { timePost } from '../utils/timePost';

const FeedPostHeaderComponent = ({post,creatorProfile}) => {
 const {isUpdating,isFollowing, handleFollowUser} = useFollowUser(post.createdBy);
  return (
    <Flex justifyContent="space-between" alignItems="center" w="full" mb={2} cursor="pointer">
      <Flex alignItems="center" gap={2}>
       <Link to={`/${creatorProfile.username}`}> <Avatar src={creatorProfile.profilePicUrl} alt={creatorProfile.username} size="sm" /></Link>
        <Flex fontSize="12px" fontWeight="bold" gap="2" alignItems="center">
          
          <Link to={`/${creatorProfile.username}`}>{creatorProfile.username} </Link>
          <Box color="gray.500"><Text fontSize={12} color={"gray"}>Posted {timePost(post.createdAt)}</Text></Box>
        </Flex>
      </Flex>
      <Box>
        <Button
        size={"xs"}
        bg={"transparent"}
          fontSize="12px"
          color="blue.500"
          fontWeight="bold"
          _hover={{ color: "white" }}
          transition="0.2s ease-in-out"
          onClick={handleFollowUser}
          isLoading={isUpdating}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      </Box>
    </Flex>
  );
};

export default FeedPostHeaderComponent;
