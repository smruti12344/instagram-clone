import { Avatar, Flex, Skeleton, SkeletonCircle, Text } from '@chakra-ui/react';
import useGetProfileById from '../hooks/useGetProfileById';
import usePostStore from '../store/PostStore';
import { Link } from 'react-router-dom';
import { timePost } from '../utils/timePost';

function CommentComponent({ comment }) {
  const { isLoading, userProfile } = useGetProfileById(comment.createdBy);
  const posts = usePostStore(state=> state.posts);

 

  if (isLoading) {
    return <CommentSkeleton />;
  }

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
          <Text fontSize={14}>{comment.comment}</Text>
        </Flex>
        <Text fontSize={12} color="gray">
          {timePost(comment.createdAt)}
        </Text>
      </Flex>
    </Flex>
  );
}

export default CommentComponent;

const CommentSkeleton = () => {
  return (
    <Flex gap={4} w="full" alignItems="center">
      <SkeletonCircle h={10} w={10} />
      <Flex gap={1} flexDir="column">
        <Skeleton height={2} width={100} />
        <Skeleton height={2} width={50} />
      </Flex>
    </Flex>
  );
};
